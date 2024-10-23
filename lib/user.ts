// lib/user.ts

import { Subscription } from '@/app/types';
import elasticsearch from './elasticsearch'; // Axios instance

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

export async function incrementFeatureCount(subscriptionId: string, feature: string): Promise<void> {
  // Increment the feature count in Elasticsearch using Axios
  try {
    await elasticsearch.post(`/${'subscriptions'}/_update/${subscriptionId}`, {
      script: {
        source: `ctx._source.featuresUsage.${feature} += 1`,
        lang: 'painless',
      },
    });
    console.log(`Feature "${feature}" incremented for subscription "${subscriptionId}".`);
  } catch (error: any) {
    console.error(`Error incrementing feature "${feature}" for subscription "${subscriptionId}":`, error.response?.data || error.message);
    throw error;
  }
}

export async function updateUserCredits(userId: string, newCredits: number): Promise<void> {
  // Update the user's credits in Elasticsearch using Axios
  try {
    await elasticsearch.post(`/${'subscriptions'}/_update/${userId}`, {
      doc: { credits: newCredits },
    });
    console.log(`Credits updated to ${newCredits} for user "${userId}".`);
  } catch (error: any) {
    console.error(`Error updating credits for user "${userId}":`, error.response?.data || error.message);
    throw error;
  }
}
