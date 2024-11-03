// lib/user.ts

import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
import { getUserAttributes } from '@/lib/auth';
import { OrganizationWithMemberships } from '@/app/types';
import elasticsearchAxios from './elasticsearchAxios'; // Updated import
import { SubscriptionTier } from '@/config/featuresConfig';

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

export async function incrementFeatureCount(userId: string, feature: string, count: number = 1): Promise<void> {
  try {
    await elasticsearchAxios.post(`/users/_update/${userId}`, {
      script: {
        source: `
          if (ctx._source.featuresUsage.containsKey(params.feature)) {
            ctx._source.featuresUsage[params.feature] += params.count;
          } else {
            ctx._source.featuresUsage[params.feature] = params.count;
          }
        `,
        params: { feature, count },
      },
    });
  } catch (error) {
    console.error(`Error incrementing feature count for user "${userId}":`, error);
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
