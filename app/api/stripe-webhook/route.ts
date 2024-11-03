// lib/subscription.ts

import { clerkClient } from '@clerk/nextjs/server';
import { SubscriptionTier } from '@/config/featuresConfig';
import { Subscription } from '@/app/types';
import elasticsearchAxios from '@/lib/elasticsearchAxios';
import stripe from '@/lib/stripe';
import { createPaymentSession } from '@/lib/paymentProcessor'; // Adjust the path if necessary
import { getSubscriptionById, getSubscriptionByUserId } from '@/lib/subscription'; // Implement these helper functions

interface PaymentSession {
  url: string;
}

/**
 * Validates whether an object conforms to the Subscription interface.
 * @param obj - The object to validate.
 * @returns Boolean indicating if the object is a valid Subscription.
 */
function isValidSubscription(obj: any): obj is Subscription {
  return (
    obj &&
    typeof obj.subscriptionId === 'string' &&
    typeof obj.subscriptionTier === 'string' &&
    typeof obj.credits === 'number' &&
    typeof obj.creditsUsed === 'number' &&
    typeof obj.monthlyCreditLimit === 'number' &&
    typeof obj.featuresUsage === 'object' &&
    typeof obj.resourceCounts === 'object' &&
    typeof obj.organizationId === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string'
  );
}


/**
 * Handles the webhook from the payment processor upon successful payment.
 * Updates the user's subscription tier in Elasticsearch.
 * @param userId - The ID of the user.
 * @param tier - The new subscription tier.
 */
export async function handleUpgradeSuccess(userId: string, tier: SubscriptionTier): Promise<void> {
  // Update subscription tier in Elasticsearch
  await updateSubscriptionTier(userId, tier);

  // Optionally, update Clerk's metadata or send notifications
}

/**
 * Updates the subscription tier in Elasticsearch.
 * @param userId - The ID of the user.
 * @param tier - The new subscription tier.
 * @returns The updated Subscription object or null if failed.
 */
export async function updateSubscriptionTier(userId: string, tier: SubscriptionTier): Promise<Subscription | null> {
  try {
    const subscription = await getSubscriptionByUserId(userId);
    if (!subscription) {
      throw new Error(`No subscription found for userId: ${userId}`);
    }

    const subscriptionId = subscription.subscriptionId;

    const response = await elasticsearchAxios.post(`/subscriptions/_update/${subscriptionId}`, {
      doc: {
        subscriptionTier: tier,
        credits: tier === SubscriptionTier.PRO ? 500 : 1000, // Adjust as needed
        monthlyCreditLimit: tier === SubscriptionTier.PRO ? 500 : 1000, // Adjust as needed
        updatedAt: new Date().toISOString(),
      },
    });

    if (response.status === 200) {
      console.log(`✅ Subscription "${subscriptionId}" updated to tier "${tier}".`);
      const updatedSubscription = await getSubscriptionById(subscriptionId);
      return updatedSubscription;
    } else {
      console.error(`❌ Failed to update subscription "${subscriptionId}":`, response.data);
      return null;
    }
  } catch (error: any) {
    console.error(`❌ Error updating subscription for user "${userId}":`, error);
    throw error;
  }
}

/**
 * Creates and assigns a free-tier subscription to a new user.
 * Stores only the subscriptionId in Clerk's privateMetadata and creates a subscription record in Elasticsearch.
 * @param userId - The ID of the new user.
 */
export async function createFreeTierSubscriptionForUser(userId: string): Promise<void> {
  console.log(`createFreeTierSubscriptionForUser called with userId: ${userId}`);
  
  const subscriptionId = `sub_free_${userId}`;
  console.log(`Generated subscriptionId: ${subscriptionId}`);

  // Retry mechanism parameters
  const maxRetries = 5;
  const delay = 1000; // 1 second

  let user;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      user = await clerkClient.users.getUser(userId);
      console.log(`User fetched successfully:`, user);
      break; // Exit loop on success
    } catch (error: any) {
      if (error.status === 404) {
        console.warn(`Attempt ${attempt}: User with id "${userId}" not found. Retrying in ${delay}ms...`);
        if (attempt === maxRetries) {
          console.error(`User with id "${userId}" not found after ${maxRetries} attempts.`);
          throw new Error(`User with id "${userId}" not found.`);
        }
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error(`Error fetching user "${userId}":`, error);
        throw error; // Re-throw non-404 errors
      }
    }
  }

  const freeSubscription: Subscription = {
    subscriptionId: subscriptionId,
    subscriptionTier: SubscriptionTier.FREE,
    userId,
    credits: 100,
    creditsUsed: 0,
    monthlyCreditLimit: 100,
    featuresUsage: {},
    resourceCounts: {},
    organizationId: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  console.log('Free-tier subscription object:', freeSubscription);

  try {
    // Store only the subscriptionId in Clerk's privateMetadata
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { subscriptionId: subscriptionId },
    });
    console.log(`Stored subscriptionId "${subscriptionId}" in Clerk for user "${userId}".`);
  } catch (error: any) {
    console.error(`Error updating user metadata in Clerk for user "${userId}":`, error);
    throw error;
  }

  try {
    // Create a new record in the Elasticsearch subscriptions index
    const esResponse = await elasticsearchAxios.post('/subscriptions/_doc', freeSubscription);
    console.log(`Created subscription record in Elasticsearch for subscriptionId "${subscriptionId}".`, esResponse.data);
  } catch (error: any) {
    console.error(`Error creating subscription in Elasticsearch for subscriptionId "${subscriptionId}":`, error);
    throw error;
  }
}

/**
 * Creates and assigns a Pro/Enterprise subscription to a new organization.
 * Stores only the subscriptionId in Clerk's organization privateMetadata and creates a subscription record in Elasticsearch.
 * @param orgId - The ID of the organization.
 * @param subscriptionTier - The subscription tier ('PRO' or 'ENTERPRISE').
 */
export async function createOrganizationSubscription(
  orgId: string,
  subscriptionTier: SubscriptionTier
): Promise<void> {
  const credits = subscriptionTier === SubscriptionTier.PRO ? 500 : 1000;

  const subscription: Subscription = {
    subscriptionId: `sub_${subscriptionTier.toLowerCase()}_${orgId}`,
    subscriptionTier,
    userId: '',
    credits,
    creditsUsed: 0,
    monthlyCreditLimit: credits,
    featuresUsage: {},
    resourceCounts: {},
    organizationId: orgId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    // Store only the subscriptionId in Clerk's organization privateMetadata
    await clerkClient.organizations.updateOrganizationMetadata(orgId, {
      privateMetadata: { subscriptionId: subscription.subscriptionId },
    });
    console.log(`Stored subscriptionId "${subscription.subscriptionId}" in Clerk for organization "${orgId}".`);

    // Create a new record in the Elasticsearch subscriptions index
    await elasticsearchAxios.post('/subscriptions/_doc', subscription);
    console.log(`Created subscription record in Elasticsearch for subscriptionId "${subscription.subscriptionId}".`);
  } catch (error: any) {
    if (error.response) {
      console.error(`❌ Server Error creating ${subscriptionTier} subscription for organization "${orgId}":`, error.response.data);
    } else if (error.request) {
      console.error(`❌ Network Error creating ${subscriptionTier} subscription for organization "${orgId}": No response received.`);
    } else {
      console.error(`❌ Error creating ${subscriptionTier} subscription for organization "${orgId}":`, error.message);
    }
    throw error;
  }
}

/**
 * Checks if a user is an organization owner.
 * @param userId - The ID of the user.
 * @param organizationId - The ID of the organization.
 * @returns Boolean indicating if the user is an owner.
 */
export async function isOrganizationOwner(userId: string, organizationId: string): Promise<boolean> {
  try {
    const organization = await clerkClient.organizations.getOrganization({ organizationId }) as any; // Adjust type if needed
    return organization.owner_id === userId;
  } catch (error: any) {
    console.error(`❌ Error checking organization ownership for organization "${organizationId}":`, error);
    return false; // Assume not owner if there's an error
  }
}
