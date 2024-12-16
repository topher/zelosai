// lib/user.ts

import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
import { getUserAttributes } from '@/lib/auth';
import { OrganizationWithMemberships, Subscription } from '@/app/types';
import elasticsearchAxios from './elasticsearchAxios'; // Updated import
import { ActionFeatureKey, FeatureKey, SubscriptionTier } from '@/config/featuresConfig';
import { getFeatureByActionKey } from '@/lib/featureUtils';


interface Membership {
  userId: string;
  role: string;
  // Add other properties if needed
}

/**
 * Updates the user profile data in Clerk.
 * @param userId - The ID of the user.
 * @param data - The data to update.
 */
export async function updateUserProfile(userId: string, data: any): Promise<void> {
  await clerkClient.users.updateUser(userId, {
    firstName: data.firstName,
    lastName: data.lastName,
    publicMetadata: data.publicMetadata,
    // Update other fields as needed
  });
}

// Export getSubscriptionTierForUser
export async function getSubscriptionTierForUser(userId: string, orgId: string): Promise<string> {
  // const userAttributes = await getUserAttributes();
  return userId;
}

export async function getUserById(userId: string): Promise<any> {
  // Fetch user data from Clerk or your database
  // For simplicity, let's mock the user data
  // Replace this with actual implementation
  return {
    id: userId,
    subscriptionTier: 'FREE', // or 'PRO', 'ENTERPRISE'
    credits: 100,
    featuresUsage: {
      monthlyProfileViews: 5,
      facetsPerBrandingCardType: 2,
      // Add more features as needed
    },
  };
}

export async function getUserSubscriptionTier(userId: string): Promise<string> {
  const user = await getUserById(userId);
  return user.subscriptionTier;
}

/**
 * Increments the feature count in Elasticsearch for a given subscription.
 * @param userId - The ID of the user.
 * @param actionFeatureKey - The ActionFeatureKey corresponding to the action performed.
 * @param subscriptionId - The ID of the subscription.
 */
export async function incrementFeatureCount(
  userId: string,
  actionFeatureKey: ActionFeatureKey,
  subscriptionId: string
): Promise<void> {
  console.log(`Incrementing feature count for subscriptionId: ${subscriptionId}`);

  try {
    const feature = getFeatureByActionKey(actionFeatureKey);
    if (!feature) {
      throw new Error(`Feature not found for ActionFeatureKey: ${actionFeatureKey}`);
    }

    const updateScript = {
      script: {
        source: `
          if (ctx._source.featuresUsage == null) {
            ctx._source.featuresUsage = [:];
          }
          if (ctx._source.featuresUsage.containsKey(params.featureKey)) {
            ctx._source.featuresUsage[params.featureKey].count += 1;
            ctx._source.featuresUsage[params.featureKey].creditsUsed += params.creditsUsed;
          } else {
            ctx._source.featuresUsage[params.featureKey] = ['count': 1, 'creditsUsed': params.creditsUsed];
          }
        `,
        params: {
          featureKey: actionFeatureKey,
          creditsUsed: 1, // Adjust as necessary
        },
        lang: 'painless',
      },
    };

    const endpoint = `/subscriptions/_update/${subscriptionId}`;
    console.log(`Updating subscription at endpoint: ${endpoint}`);

    const response = await elasticsearchAxios.post(endpoint, updateScript);

    if (response.status === 200 || response.status === 201) {
      console.log(`✅ Feature "${actionFeatureKey}" count incremented for subscription "${subscriptionId}".`);
    } else {
      console.log(`❌ Failed to increment feature count for subscription "${subscriptionId}". Status: ${response.status}`);
      console.log('Elasticsearch Response:', response.data);
      throw new Error(`Failed to increment feature count. Status: ${response.status}`);
    }
  } catch (error: any) {
    if (error.response) {
      console.log(`❌ Elasticsearch Error:`, error.response.data);
    } else if (error.request) {
      console.log('❌ No response received from Elasticsearch:', error.request);
    } else {
      console.log(`❌ Error incrementing feature count for subscription "${subscriptionId}":`, error.message);
    }
    throw error;
  }
}



export async function updateUserCredits(subscriptionId: string, newCredits: number): Promise<void> {
  // Update the user's credits in Elasticsearch using Axios
  try {
    await elasticsearchAxios.post(`/subscriptions/_update/${subscriptionId}`, {
      doc: { credits: newCredits },
    });
    console.log(`Credits updated to ${newCredits} for subscription "${subscriptionId}".`);
  } catch (error: any) {
    console.error(`Error updating credits for subscription "${subscriptionId}":`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Update features usage for a subscription
 */
export async function updateSubscriptionFeaturesUsage(subscriptionId: string, featureKey: string, increment: number = 1): Promise<void> {
  try {
    await elasticsearchAxios.post(`/subscriptions/_update/${subscriptionId}`, {
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
  } catch (error: any) {
    console.error(`❌ Error updating features usage for subscription ${subscriptionId}:`, error.response?.data || error.message);
    throw error;
  }
}
