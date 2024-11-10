// lib/credits.ts

import { Subscription, FeaturesUsage } from '@/app/types';
import { getSubscriptionById, updateSubscription } from './subscription';
import { toast } from 'react-hot-toast';
import { subscriptionTiers } from '../config/subscriptionTiers';
import { TIER_ORDER, features, SubscriptionTier, Action, ActionFeatureKey } from '@/config/featuresConfig';
import { isActionFeatureKeyFn } from './featureUtils';

/**
 * Interface for Deduct Credits and Increment Usage
 */
export interface DeductAndIncrementParams {
  userId: string;
  orgId: string;
  action: Action;
  actionFeatureKey: ActionFeatureKey;
  subscriptionId: string;
}

/**
 * Deducts credits and increments usage for a user.
 * @param params - The parameters for the operation.
 * @param subscription - The user's subscription object.
 * @returns An object indicating success and relevant data.
 */
export async function deductCreditsAndIncrementUsage(
  params: DeductAndIncrementParams,
  subscription: Subscription
): Promise<{ success: boolean; creditsDeducted?: number; error?: string }> {
  const { userId, orgId, action, actionFeatureKey, subscriptionId } = params;

  console.log("Credits Deduction - Start");
  console.log(`User ID: ${userId}`);
  console.log(`Action: ${action}`);
  console.log(`ActionFeatureKey: ${actionFeatureKey}`);

  try {
    if (!subscription) {
      return { success: false, error: 'Subscription not found.' };
    }

    const subscriptionTier = subscription.subscriptionTier as SubscriptionTier;
    const tierIndex = TIER_ORDER.indexOf(subscriptionTier);

    if (tierIndex === -1) {
      return { success: false, error: 'Invalid subscription tier.' };
    }

    // Find the Feature by ActionFeatureKey
    const feature = features.find(f => f.actions.some(a => a.actionKey === actionFeatureKey));
    if (!feature) {
      return { success: false, error: 'Feature not found.' };
    }

    // Find the action configuration
    const actionConfig = feature.actions.find(a => a.actionKey === actionFeatureKey);
    if (!actionConfig) {
      return { success: false, error: 'Action not allowed for this feature.' };
    }

    // Check if user's subscription tier allows this action
    const requiredTierIndex = TIER_ORDER.indexOf(actionConfig.baseTier);
    if (tierIndex < requiredTierIndex) {
      return { success: false, error: 'Action not allowed for your subscription tier.' };
    }

    // Ensure actionFeatureKey is valid
    if (!isActionFeatureKeyFn(actionFeatureKey)) {
      console.warn(`Invalid ActionFeatureKey: ${actionFeatureKey}`);
      return { success: false, error: 'Invalid feature action key.' };
    }

    const currentUsageCount = subscription.featuresUsage[actionFeatureKey]?.count || 0;
    const resourceLimit = actionConfig.resourceLimits[tierIndex];

    if (resourceLimit >= 0 && currentUsageCount >= resourceLimit) {
      return { success: false, error: 'Resource limit reached for this action.' };
    }

    // Check if user has enough credits
    if (subscription.credits < actionConfig.creditCost) {
      return { success: false, error: 'Insufficient credits.' };
    }

    // Deduct credits
    const updatedCredits = subscription.credits - actionConfig.creditCost;

    // Increment usage
    const updatedFeaturesUsage: FeaturesUsage = {
      ...subscription.featuresUsage,
      [actionFeatureKey]: {
        count: currentUsageCount + 1,
        creditsUsed: (subscription.featuresUsage[actionFeatureKey]?.creditsUsed || 0) + actionConfig.creditCost,
      },
    };

    // Update subscription directly
    const updateResult = await updateSubscription(subscriptionId, {
      credits: updatedCredits,
      featuresUsage: updatedFeaturesUsage,
    });

    if (!updateResult) {
      return { success: false, error: 'Failed to update subscription.' };
    }

    // Handle credit threshold notifications
    await handleCreditThresholdNotifications(userId, updatedCredits, subscriptionTier);

    console.log("Credits Deduction - End");

    return { success: true, creditsDeducted: actionConfig.creditCost };
  } catch (error: any) {
    console.error('Error in deductCreditsAndIncrementUsage:', error);
    return { success: false, error: 'Internal Server Error.' };
  }
}

/**
 * Handle Credit Threshold Notifications
 */
async function handleCreditThresholdNotifications(userId: string, creditsRemaining: number, subscriptionTier: SubscriptionTier) {
  const initialCredits = getInitialCreditsForUser({ subscriptionTier });
  const percentageRemaining = (creditsRemaining / initialCredits) * 100;

  console.log(`Percentage Remaining: ${percentageRemaining}%`);

  if (percentageRemaining <= 10) {
    await sendCreditNotification(userId, 'You have 10% of your credits remaining.');
    toast.error('You have 10% of your credits remaining.');
    console.log("Notification Sent: 10% Credits Remaining");
  } else if (percentageRemaining <= 50) {
    await sendCreditNotification(userId, 'You have 50% of your credits remaining.');
    toast.error('You have 50% of your credits remaining.');
    console.log("Notification Sent: 50% Credits Remaining");
  }
}

/**
 * Mock function. Implement actual notification logic.
 */
async function sendCreditNotification(userId: string, message: string): Promise<void> {
  // Implement notification logic here, e.g., send email or in-app notification
  console.log(`Notification to ${userId}: ${message}`);
}

/**
 * Determine initial credits based on subscription tier
 */
function getInitialCreditsForUser(user: { subscriptionTier: SubscriptionTier }): number {
  // Determine initial credits based on subscription tier
  const tier = user.subscriptionTier;
  const subscriptionTier = subscriptionTiers[tier];
  return typeof subscriptionTier.credits === 'number'
    ? subscriptionTier.credits
    : Number.MAX_SAFE_INTEGER; // Handle 'unlimited'
}

/**
 * Fetches and calculates used and remaining credits based on subscription.
 * @param subscriptionId - The unique identifier for the subscription.
 * @returns An object containing used and remaining credits.
 */
export async function getCreditsUsage(subscriptionId: string): Promise<{ used: number; remaining: number }> {
  try {
    const subscription: Subscription | null = await getSubscriptionById(subscriptionId);

    if (!subscription) {
      console.error(`Subscription with ID ${subscriptionId} not found.`);
      throw new Error('Subscription not found.');
    }

    const used = subscription.creditsUsed; // Assuming this field exists
    const total = subscription.credits; // Total credits allocated
    const remaining = total - used;

    return { used, remaining };
  } catch (error: any) {
    console.error('Error fetching credits usage:', error);
    toast.error('Failed to fetch credits usage.');
    return { used: 0, remaining: 0 };
  }
}
