// lib/subscription.ts
import { Clerk } from '@clerk/clerk-sdk-node';
const clerkClient = Clerk({ apiKey: process.env.CLERK_SECRET_KEY! });
import { SubscriptionTier, Feature, FeatureKey, ActionFeatureKey, features as allFeatures } from '@/config/featuresConfig';
import { PaymentSession, User, Organization, FeaturesUsage, ResourceCounts, } from '@/app/types';
import elasticsearchAxios from './elasticsearchAxios';
import stripe from '@/lib/stripe';
import axios from 'axios';
import { Subscription } from '@/app/types';
import logger from './logger';

/**
 * Generates a default FeaturesUsage object with all ActionFeatureKeys initialized.
 * @returns FeaturesUsage object with default values.
 */
export function generateDefaultFeaturesUsage(): FeaturesUsage {
  const defaultUsage: FeaturesUsage = {};
  const actionKeys = Object.values(ActionFeatureKey);

  actionKeys.forEach((actionKey) => {
    defaultUsage[actionKey] = {
      count: 0,
      creditsUsed: 0,
    };
  });

  return defaultUsage;
}

/**
 * Generates a default ResourceCounts object with all FeatureKeys initialized.
 * @returns ResourceCounts object with default values.
 */
export function generateDefaultResourceCounts(): ResourceCounts {
  const defaultCounts: ResourceCounts = {};
  const featureKeys = Object.values(FeatureKey);

  featureKeys.forEach((featureKey) => {
    defaultCounts[featureKey] = 0;
  });

  return defaultCounts;
}

/**
 * Generates a new Subscription object with default FeaturesUsage and ResourceCounts.
 * @param userId - The ID of the user.
 * @param subscriptionTier - The subscription tier (default is 'FREE').
 * @returns A Subscription object with initialized values.
 */
export function generateNewUserSubscription(userId: string, subscriptionTier: SubscriptionTier = SubscriptionTier.FREE): Subscription {
  const subscriptionId = `sub_${subscriptionTier.toLowerCase()}_${userId}`;
  const currentTimestamp = new Date().toISOString();

  const newSubscription: Subscription = {
    subscriptionId,
    userId,
    subscriptionTier,
    credits: subscriptionTier === SubscriptionTier.FREE ? 100 : 500, // Adjust based on tier
    creditsUsed: 0,
    monthlyCreditLimit: subscriptionTier === SubscriptionTier.FREE ? 100 : 500, // Adjust based on tier
    featuresUsage: generateDefaultFeaturesUsage(),
    resourceCounts: generateDefaultResourceCounts(),
    organizationId: '', // Empty for personal subscriptions
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
  };

  return newSubscription;
}

/**
 * Generates and logs a default subscription object for a given user.
 * Useful for copying and pasting into static JSON files.
 * @param userId - The ID of the user.
 * @param subscriptionTier - The subscription tier (default is 'FREE').
 */
export function logDefaultSubscription(userId: string, subscriptionTier: SubscriptionTier = SubscriptionTier.FREE): void {
  const subscription = generateNewUserSubscription(userId, subscriptionTier);
  console.log('Copy and paste the following JSON into your static subscription file:\n');
  console.log(JSON.stringify(subscription, null, 2));
}

// Subscription Functions

/**
 * Validates the subscription object against the Subscription interface.
 * Ensures that either userId or organizationId is present.
 * @param obj - The subscription object to validate.
 */
export function isValidSubscription(obj: any): obj is Subscription {
  if (
    !obj ||
    typeof obj.subscriptionId !== 'string' ||
    typeof obj.subscriptionTier !== 'string' ||
    typeof obj.credits !== 'number' ||
    typeof obj.creditsUsed !== 'number' ||
    typeof obj.monthlyCreditLimit !== 'number' ||
    typeof obj.featuresUsage !== 'object' ||
    typeof obj.resourceCounts !== 'object' ||
    typeof obj.createdAt !== 'string' ||
    typeof obj.updatedAt !== 'string'
  ) {
    return false;
  }

  const hasValidUserId =
    obj.userId === undefined ||
    obj.userId === null ||
    (typeof obj.userId === 'string' && obj.userId.trim() !== '');

  const hasValidOrgId =
    obj.organizationId === undefined ||
    obj.organizationId === null ||
    (typeof obj.organizationId === 'string' && obj.organizationId.trim() !== '');

  // Ensure that either userId or organizationId is present
  if (!hasValidUserId && !hasValidOrgId) {
    return false;
  }

  return true;
}

/**
 * Fetches a subscription by its subscriptionId field.
 * @param subscriptionId - The subscriptionId to search for.
 * @returns The Subscription object or null if not found.
 */
export async function getSubscriptionById(subscriptionId: string): Promise<Subscription | null> {
  const endpoint = `/subscriptions/_search`;
  console.log(`🔍 Searching for subscription with subscriptionId: ${subscriptionId}`);

  try {
    const response = await elasticsearchAxios.post(endpoint, {
      query: { term: { subscriptionId } },
      size: 1,
    });

    const hits = response.data.hits.hits;
    // console.log(`Elasticsearch response hits: ${JSON.stringify(hits)}`);

    if (hits.length > 0) {
      const subscription = hits[0]._source as Subscription;

      if (subscription) {
        console.log(`✅ Subscription with subscriptionId: ${subscriptionId} retrieved successfully.`);
        return subscription;
      } else {
        console.error(`❌ Invalid subscription data for subscriptionId: ${subscriptionId}`);
        return null;
      }
    } else {
      console.warn(`❌ No subscription found with subscriptionId: ${subscriptionId}`);
      return null;
    }
  } catch (error: any) {
    console.error(`❌ Error fetching subscription "${subscriptionId}":`, error);
    throw error;
  }
}

/**
 * Fetches a subscription by the associated userId field.
 * @param userId - The userId to search for.
 * @returns The Subscription object or null if not found.
 */
export async function getSubscriptionByUserId(userId: string): Promise<Subscription | null> {
  const endpoint = `/subscriptions/_search`;
  console.log(`🔍 Searching for subscription with userId: ${userId}`);

  try {
    const response = await elasticsearchAxios.post(endpoint, {
      query: { term: { userId } },
      size: 1,
    });

    const hits = response.data.hits.hits;
    // console.log(`Elasticsearch response hits: ${JSON.stringify(hits)}`);

    if (hits.length > 0) {
      const subscription = hits[0]._source as Subscription;

      if (isValidSubscription(subscription)) {
        console.log(`✅ Subscription for userId: ${userId} retrieved successfully.`);
        return subscription;
      } else {
        console.error(`❌ Invalid subscription data for userId: ${userId}`);
        return null;
      }
    } else {
      console.warn(`❌ No subscription found for userId: ${userId}`);
      return null;
    }
  } catch (error: any) {
    console.error(`❌ Error fetching subscription for userId "${userId}":`, error);
    throw error;
  }
}

/**
 * Fetches a subscription by the associated organizationId.
 * @param organizationId - The organizationId to search for.
 * @returns The Subscription object or null if not found.
 */
export async function getSubscriptionByOrganizationId(organizationId: string): Promise<Subscription | null> {
  console.log(`🔍 Searching for subscription with organizationId: ${organizationId}`);

  try {
    // Retrieve subscriptionId from organization's privateMetadata
    const organization = await clerkClient.organizations.getOrganization({ organizationId });
    const subscriptionId = organization.privateMetadata?.subscriptionId as string;

    if (!subscriptionId) {
      console.warn(`❌ No subscriptionId found in organization "${organizationId}" privateMetadata.`);
      return null;
    }

    // Fetch the subscription using subscriptionId
    return await getSubscriptionById(subscriptionId);
  } catch (error: any) {
    console.error(`❌ Error fetching subscription for organization "${organizationId}":`, error);
    throw error;
  }
}

/**
 * Fetches the appropriate subscription based on orgId and userId.
 * - If orgId is provided, fetch the organization's subscription.
 * - Otherwise, fetch the user's personal subscription.
 * @param orgId - The ID of the organization (optional).
 * @param userId - The ID of the user.
 * @returns The Subscription object or null if not found.
 */
export async function getSubscription(orgId: string | null, userId: string): Promise<Subscription | null> {
  try {
    if (orgId) {
      console.log(`Fetching subscription for organization "${orgId}".`);
      return await getSubscriptionByOrganizationId(orgId);
    } else {
      console.log(`Fetching personal subscription for user "${userId}".`);
      return await getSubscriptionByUserId(userId);
    }
  } catch (error: any) {
    console.error(`❌ Error fetching subscription for orgId "${orgId}" and user "${userId}":`, error);
    throw error;
  }
}

/**
 * Updates the subscription credits.
 * @param subscriptionId - The unique identifier for the subscription.
 * @param newCredits - The new credit balance.
 */
export async function updateSubscriptionCredits(subscriptionId: string, newCredits: number): Promise<void> {
  try {
    await elasticsearchAxios.post(`/subscriptions/_update/${subscriptionId}`, {
      doc: { credits: newCredits },
    });
    console.log(`✅ Subscription "${subscriptionId}" credits updated to ${newCredits}.`);
  } catch (error: any) {
    console.error(`❌ Error updating credits for subscription "${subscriptionId}":`, error);
    throw error;
  }
}

/**
 * Increments the usage count for a specific feature within a subscription.
 * @param subscriptionId - The unique identifier for the subscription.
 * @param featureKey - The combined feature-action key.
 * @param increment - The number to increment the usage by (default is 1).
 */
export async function updateSubscriptionFeaturesUsage(
  subscriptionId: string,
  featureKey: string,
  increment: number = 1
): Promise<void> {
  const endpoint = `/subscriptions/_update/${subscriptionId}`;
  try {
    await elasticsearchAxios.post(endpoint, {
      script: {
        source: `
          if (ctx._source.featuresUsage.containsKey(params.featureKey)) {
            ctx._source.featuresUsage[params.featureKey] += params.increment;
          } else {
            ctx._source.featuresUsage[params.featureKey] = params.increment;
          }
        `,
        params: { featureKey, increment },
      },
    });
    console.log(`✅ Subscription "${subscriptionId}" feature "${featureKey}" usage incremented by ${increment}.`);
  } catch (error: any) {
    if (error.response) {
      console.error(
        `❌ Server Error updating feature usage for subscription "${subscriptionId}": ${JSON.stringify(error.response.data)}`
      );
    } else if (error.request) {
      console.error(
        `❌ Network Error updating feature usage for subscription "${subscriptionId}": No response received.`
      );
    } else {
      console.error(`❌ Error updating feature usage for subscription "${subscriptionId}": ${error.message}`);
    }
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

  let user: User;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      user = await clerkClient.users.getUser(userId) as User;
      console.log(`User fetched successfully:`, user);
      break; // Exit loop on success
    } catch (error: any) {
      if (error.status === 404) {
        console.warn(`Attempt ${attempt}: User with id "${userId}" not found. Retrying in ${delay}ms...`);
        if (attempt === maxRetries) {
          console.error(`User with id "${userId}" not found after ${maxRetries} attempts.`);
          throw new Error(`User with id "${userId}" not found.`);
        }
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error(`Error fetching user "${userId}":`, error);
        throw error; // Re-throw non-404 errors
      }
    }
  }

  const freeSubscription: Subscription = {
    subscriptionId: subscriptionId,
    subscriptionTier: SubscriptionTier.FREE,
    credits: 100,
    creditsUsed: 0,
    monthlyCreditLimit: 100,
    featuresUsage: {},
    resourceCounts: {},
    organizationId: '',
    userId,
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
    console.log(
      `Created subscription record in Elasticsearch for subscriptionId "${subscriptionId}".`,
      esResponse.data
    );
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
    credits,
    creditsUsed: 0,
    monthlyCreditLimit: credits,
    featuresUsage: {},
    resourceCounts: {},
    organizationId: orgId,
    userId: '', // Organization subscription, so userId is empty
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
      console.error(
        `❌ Server Error creating ${subscriptionTier} subscription for organization "${orgId}":`,
        error.response.data
      );
    } else if (error.request) {
      console.error(
        `❌ Network Error creating ${subscriptionTier} subscription for organization "${orgId}": No response received.`
      );
    } else {
      console.error(`❌ Error creating ${subscriptionTier} subscription for organization "${orgId}":`, error.message);
    }
    throw error;
  }
}

/**
 * Updates the user's personal subscription tier.
 * @param userId - The ID of the user.
 * @param tier - The new subscription tier.
 */
export async function updateUserSubscription(userId: string, tier: SubscriptionTier): Promise<void> {
  try {
    const user = await clerkClient.users.getUser(userId) as User;

    // Retrieve subscriptionId from privateMetadata
    const subscriptionId = user.privateMetadata?.subscriptionId as string;
    if (!subscriptionId) {
      throw new Error('Subscription ID not found in user metadata.');
    }

    // Update the subscription in Elasticsearch
    const updatedSubscription = await updateSubscriptionTierInElasticsearch(subscriptionId, tier);
    if (!updatedSubscription) {
      throw new Error('Failed to update subscription in Elasticsearch.');
    }

    console.log(`✅ Subscription "${subscriptionId}" upgraded to ${tier} for user "${userId}".`);
  } catch (error: any) {
    console.error(`❌ Error upgrading subscription for user "${userId}":`, error);
    throw error;
  }
}

/**
 * Updates the subscription tier in Elasticsearch.
 * @param subscriptionId - The ID of the subscription.
 * @param tier - The new subscription tier.
 * @returns The updated Subscription object or null if failed.
 */
async function updateSubscriptionTierInElasticsearch(
  subscriptionId: string,
  tier: SubscriptionTier
): Promise<Subscription | null> {
  try {
    const response = await elasticsearchAxios.post(`/subscriptions/_update/${subscriptionId}`, {
      doc: {
        subscriptionTier: tier,
        credits: tier === SubscriptionTier.PRO ? 500 : 1000,
        monthlyCreditLimit: tier === SubscriptionTier.PRO ? 500 : 1000,
        updatedAt: new Date().toISOString(),
      },
    });

    if (response.status === 200) {
      // Fetch the updated subscription
      const updatedSubscription = await getSubscriptionById(subscriptionId);
      return updatedSubscription;
    } else {
      console.error(`❌ Failed to update subscription "${subscriptionId}":`, response.data);
      return null;
    }
  } catch (error: any) {
    console.error(`❌ Error updating subscription "${subscriptionId}":`, error);
    return null;
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
    const organization = await clerkClient.organizations.getOrganization({ organizationId }) as Organization;
    return organization.ownerUserId === userId;
  } catch (error: any) {
    console.error(`❌ Error checking organization ownership for organization "${organizationId}":`, error);
    return false; // Assume not owner if there's an error
  }
}

/**
 * Updates an existing organization's subscription tier.
 * @param subscriptionId - The ID of the subscription to update.
 * @param newTier - The new subscription tier.
 * @returns The updated Subscription object or null if the update failed.
 */
export async function updateOrganizationSubscription(
  subscriptionId: string,
  newTier: SubscriptionTier
): Promise<Subscription | null> {
  try {
    // Fetch the current subscription
    const currentSubscription = await getSubscriptionById(subscriptionId);
    if (!currentSubscription) {
      console.error(`Subscription with ID "${subscriptionId}" not found.`);
      return null;
    }

    // Update subscription details based on the new tier
    const updatedSubscription: Subscription = {
      ...currentSubscription,
      subscriptionTier: newTier,
      credits: newTier === SubscriptionTier.PRO ? 500 : 1000, // Example logic
      monthlyCreditLimit: newTier === SubscriptionTier.PRO ? 500 : 1000,
      updatedAt: new Date().toISOString(),
    };

    // Update the subscription in Elasticsearch
    const response = await elasticsearchAxios.post(`/subscriptions/_update/${subscriptionId}`, {
      doc: {
        subscriptionTier: updatedSubscription.subscriptionTier,
        credits: updatedSubscription.credits,
        monthlyCreditLimit: updatedSubscription.monthlyCreditLimit,
        updatedAt: updatedSubscription.updatedAt,
      },
    });

    if (response.status === 200) {
      console.log(`Subscription "${subscriptionId}" updated to tier "${newTier}".`);
      return updatedSubscription;
    } else {
      console.error(`Failed to update subscription "${subscriptionId}":`, response.data);
      return null;
    }
  } catch (error: any) {
    console.error(`Error updating subscription "${subscriptionId}":`, error);
    return null;
  }
}


/**
 * Updates the subscription's credits and feature usage after performing an action.
 * @param subscriptionId - The ID of the subscription to update.
 * @param featureKey - The feature key related to the action.
 * @param action - The action performed.
 * @returns The updated subscription object or null if failed.
 */
export async function updateSubscription(
  subscriptionId: string,
  updates: Partial<Subscription>
): Promise<boolean> {
  try {
    await elasticsearchAxios.post(`/subscriptions/_update/${subscriptionId}`, {
      doc: updates,
    });
    console.log(`✅ Subscription "${subscriptionId}" updated successfully.`);
    return true;
  } catch (error: any) {
    console.error(`❌ Error updating subscription "${subscriptionId}":`, error);
    return false;
  }
}

/**
 * Performs the specified action on a resource.
 * @param featureKey - The feature key (e.g., 'Goals').
 * @param action - The action to perform (e.g., 'create').
 * @param subscription - The user's subscription object.
 * @returns An object indicating success and a message.
 */
export async function performActionOnResource(
  featureKey: FeatureKey,
  action: 'read' | 'create' | 'edit' | 'delete',
  subscription: Subscription
): Promise<{ success: boolean; message: string }> {
  try {
    // Implement the logic to perform the action.
    // This could involve interacting with Elasticsearch to create, edit, or delete documents.
    // For demonstration, we'll assume the action is always successful.

    if (action === 'create') {
      // Define the new document
      const newDocument = {
        subscriptionId: subscription.subscriptionId,
        // Add other necessary fields based on feature
        name: 'New Resource',
        createdAt: new Date().toISOString(),
        // ... other fields
      };

      // Index the new document into Elasticsearch
      const response = await axios.post(
        `${process.env.ELASTICSEARCH_NODE}/${featureKey}/_doc`,
        newDocument,
        {
          auth: {
            username: process.env.ELASTICSEARCH_USERNAME,
            password: process.env.ELASTICSEARCH_PASSWORD,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log(`Successfully created a new document in "${featureKey}" index.`);
        return { success: true, message: 'Resource created successfully.' };
      } else {
        console.log(`Failed to create a new document in "${featureKey}" index.`);
        return { success: false, message: 'Failed to create resource.' };
      }
    }

    // Implement other actions ('read', 'edit', 'delete') similarly.

    // Placeholder for other actions
    return { success: true, message: 'Action performed successfully.' };
  } catch (error: any) {
    console.log(`Error performing action "${action}" on feature "${featureKey}":`, error);
    return { success: false, message: 'Failed to perform action due to an error.' };
  }
}

/**
 * Creates a Stripe Checkout session for subscription upgrades.
 * @param userId - The ID of the user.
 * @param tier - The desired subscription tier.
 * @returns A PaymentSession object containing the checkout URL.
 */
export async function createPaymentSession(userId: string, tier: SubscriptionTier): Promise<PaymentSession> {
  try {
    // Define price IDs for different tiers in Stripe dashboard
    const priceIdMap: { [key in SubscriptionTier]: string } = {
      FREE: '', // No payment needed for free tier
      PRO: process.env.STRIPE_PRO_PRICE_ID || '',
      ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
    };

    if (!priceIdMap[tier]) {
      throw new Error(`Price ID for tier "${tier}" is not defined.`);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceIdMap[tier],
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        tier, // Pass the desired tier
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
    });

    console.log(`✅ Created Stripe Checkout session for userId: ${userId}, tier: ${tier}`);
    return { url: session.url as string };
  } catch (error: any) {
    console.error('❌ Error creating payment session:', error);
    throw new Error('Failed to create payment session.');
  }
}

/**
 * Initiates the subscription upgrade process for a user.
 * @param userId - The ID of the user.
 * @param tier - The desired subscription tier.
 * @returns A URL to redirect the user to the payment page.
 */
export async function initiateUpgrade(user: User, tier: SubscriptionTier): Promise<string> {
  // Updated Code
  const orgId = user.organizationMemberships && user.organizationMemberships.length > 0
  ? user.organizationMemberships[0].organization.id
  : null;
  // Fetch current subscription
  const subscription = await getSubscription(orgId,user.id);
  if (!subscription) {
    throw new Error('Subscription not found.');
  }

  // Create a payment session with your payment processor (e.g., Stripe)
  const paymentSession = await createPaymentSession(user.id, tier);

  // Optionally, update subscription status to 'pending' or similar

  return paymentSession.url; // Redirect the user to this URL for payment
}

/**
 * Handles the webhook from the payment processor upon successful payment.
 * Updates the user's subscription tier in Elasticsearch.
 * @param userId - The ID of the user.
 * @param tier - The new subscription tier.
 */
export async function handleUpgradeSuccess(userId: string, tier: SubscriptionTier): Promise<void> {
  try {
    // Fetch the user from Clerk
    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    // Extract orgId from user's organization memberships
    const orgId = user.organizationMemberships && user.organizationMemberships.length > 0
      ? user.organizationMemberships[0].organization.id
      : null;

    // Fetch the appropriate subscription
    const subscription = await getSubscription(orgId, user.id);
    if (!subscription) {
      throw new Error('Subscription not found.');
    }

    if (subscription.organizationId) {
      // Update organization subscription
      await updateOrganizationSubscription(subscription.subscriptionId, tier);
    } else {
      // Update user subscription
      await updateUserSubscription(user.id, tier);
    }

    // Optionally, update Clerk's metadata or send notifications
  } catch (error: any) {
    console.error(`❌ Error updating subscription for user "${userId}":`, error);
    throw error;
  }
}

/**
 * Checks if a user is an organization member.
 * @param userId - The ID of the user.
 * @returns Boolean indicating if the user is part of any organization.
 */
export async function isUserInOrganization(userId: string): Promise<boolean> {
  try {
    const user = await clerkClient.users.getUser(userId) as User;
    const organizationMemberships = user.organizationMemberships;
    return organizationMemberships && organizationMemberships.length > 0;
  } catch (error: any) {
    console.error(`❌ Error checking organization membership for user "${userId}":`, error);
    return false;
  }
}
