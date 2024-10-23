// lib/subscription.ts

import { Subscription, SubscriptionTier } from '@/app/types';
import elasticsearch from './elasticsearch'; // Axios instance

/**
 * Searches for a subscription by user ID.
 * @param userId - The ID of the user.
 * @returns The Subscription object if found, else null.
 */
export async function getSubscriptionByUserId(userId: string): Promise<Subscription | null> {
  try {
    const response = await elasticsearch.post('/subscriptions/_search', {
      query: {
        term: { userId },
      },
    });

    const hitsTotal = response.data.hits.total;
    let totalHits: number;

    if (typeof hitsTotal === 'object' && 'value' in hitsTotal) {
      totalHits = hitsTotal.value;
    } else if (typeof hitsTotal === 'number') {
      totalHits = hitsTotal;
    } else {
      // Handle unexpected type, e.g., default to 0
      console.warn('Unexpected type for hits.total:', hitsTotal);
      totalHits = 0;
    }

    if (totalHits > 0) {
      return response.data.hits.hits[0]._source as Subscription;
    }

    return null;
  } catch (error: any) {
    console.error(`Error fetching subscription for userId "${userId}":`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Updates the credits for a subscription.
 * @param subscriptionId - The ID of the subscription.
 * @param newCredits - The new credit amount.
 */
export async function updateSubscriptionCredits(subscriptionId: string, newCredits: number): Promise<void> {
  try {
    await elasticsearch.post(`/_update/subscriptions/${subscriptionId}`, {
      doc: { credits: newCredits },
    });
    console.log(`Credits updated to ${newCredits} for subscription "${subscriptionId}".`);
  } catch (error: any) {
    console.error(`Error updating credits for subscription "${subscriptionId}":`, error.response?.data || error.message);
    throw error;
  }
}
