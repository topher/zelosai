// lib/credits.ts

import { getSubscriptionById } from './subscription';
import { toast } from 'react-hot-toast';
import { baseCreditCosts, subscriptionMultipliers } from '../config/creditConfig';
import { subscriptionTiers } from '../config/subscriptionTiers';
import { logUserAction } from './logging';
import { features, FeatureKey, getActionKey, SubscriptionTier, TIER_ORDER, ActionFeatureKey } from '@/config/featuresConfig';
import { Subscription, FeaturesUsage, UserAction } from '@/app/types';
import axios from 'axios';

/**
 * Type Guard to check if a key is a valid ActionFeatureKey
 */
function isActionFeatureKey(key: string): key is ActionFeatureKey {
  return Object.values(ActionFeatureKey).includes(key as ActionFeatureKey);
}

/**
 * Interface for Deduct Credits Parameters
 */
interface DeductCreditsParams {
  userId: string;
  orgId: string;
  action: 'read' | 'create' | 'edit' | 'delete';
  resourceType?: string;
  feature: FeatureKey;
  subscriptionId: string;
}

/**
 * Interface for Deduct Credits and Increment Usage
 */
interface DeductAndIncrementParams {
  userId: string;
  orgId: string;
  action: 'read' | 'create' | 'edit' | 'delete';
  featureKey: FeatureKey;
  subscriptionId: string;
}

/**
 * Deducts credits and increments usage for a user.
 * @param params - The parameters for the operation.
 * @returns An object indicating success and relevant data.
 */
export async function deductCreditsAndIncrementUsage(params: DeductAndIncrementParams): Promise<{ success: boolean; creditsDeducted?: number; error?: string }> {
  const { userId, orgId, action, featureKey, subscriptionId } = params;

  try {
    // Fetch user's subscription
    const subscriptionResponse = await axios.get(`/api/resource/subscriptions/${subscriptionId}`);
    const subscription: Subscription = subscriptionResponse.data.subscription;

    if (!subscription) {
      return { success: false, error: 'Subscription not found.' };
    }

    // Determine tier index
    const tierIndex = TIER_ORDER.indexOf(subscription.subscriptionTier);
    if (tierIndex === -1) {
      return { success: false, error: 'Invalid subscription tier.' };
    }

    // Find the feature configuration
    const feature = features.find(f => f.key === featureKey);
    if (!feature) {
      return { success: false, error: 'Feature not found.' };
    }

    // Find the action configuration
    const actionConfig = feature.actions.find(a => a.action === action);
    if (!actionConfig) {
      return { success: false, error: 'Action not allowed for this feature.' };
    }

    // Check if user has enough credits
    if (subscription.credits < actionConfig.creditCost) {
      return { success: false, error: 'Insufficient credits.' };
    }

    // Deduct credits
    const updatedCredits = subscription.credits - actionConfig.creditCost;

    // Increment usage
    const combinedKey = getActionKey(featureKey, action);

    // Use Type Guard to ensure combinedKey is a valid ActionFeatureKey
    if (!isActionFeatureKey(combinedKey)) {
      console.warn(`Invalid ActionFeatureKey: ${combinedKey}`);
      return { success: false, error: 'Invalid feature action key.' };
    }

    const updatedFeaturesUsage: FeaturesUsage = {
      ...subscription.featuresUsage,
      [combinedKey]: {
        count: (subscription.featuresUsage[combinedKey]?.count || 0) + 1,
        creditsUsed: (subscription.featuresUsage[combinedKey]?.creditsUsed || 0) + actionConfig.creditCost,
      },
    };

    // Update subscription via API
    const updateResponse = await axios.post(`/api/resource/subscriptions/update`, {
      subscriptionId,
      updates: {
        credits: updatedCredits,
        featuresUsage: updatedFeaturesUsage,
      },
    });

    if (updateResponse.status !== 200) {
      return { success: false, error: 'Failed to update subscription.' };
    }

    return { success: true, creditsDeducted: actionConfig.creditCost };
  } catch (error: any) {
    console.error('Error in deductCreditsAndIncrementUsage:', error);
    return { success: false, error: 'Internal Server Error.' };
  }
}

/**
 * Deduct Credits Function
 */
export async function deductCredits(params: DeductCreditsParams): Promise<number | false> {
  const { userId, orgId, action, resourceType, feature, subscriptionId } = params;

  console.log("Credits Deduction - Start");
  console.log(`User ID: ${userId}`);
  console.log(`Action: ${action}`);
  console.log(`Resource Type: ${resourceType}`);
  console.log(`Feature: ${feature}`);

  try {
    // Fetch user subscription
    const subscriptionResponse = await axios.get(`/api/resource/subscriptions/${subscriptionId}`);
    const subscription: Subscription = subscriptionResponse.data.subscription;

    if (!subscription) {
      console.error("Subscription not found for user:", userId);
      return false;
    }

    const subscriptionTier = subscription.subscriptionTier as SubscriptionTier;

    console.log(`Subscription Tier: ${subscriptionTier}`);

    let finalCost: number;
    const combinedKey = getActionKey(feature, action);

    // Use Type Guard to ensure combinedKey is a valid ActionFeatureKey
    if (!isActionFeatureKey(combinedKey)) {
      console.warn(`Invalid ActionFeatureKey: ${combinedKey}`);
      return false;
    }

    // Check for Enterprise tier
    if (subscriptionTier === SubscriptionTier.ENTERPRISE) {
      console.log("Enterprise Tier - No Credits Deducted");
      finalCost = 0; // No credits deducted
    } else {
      // Calculate the cost based on action and feature
      const key = `${action}:${feature}`;
      console.log(`Base Cost Key: ${key}`);

      const baseCost = baseCreditCosts[key];
      if (typeof baseCost === 'undefined') {
        console.error('Base cost not defined for key:', key);
        return false;
      }
      console.log(`Base Cost: ${baseCost}`);

      // Apply multiplier based on subscription tier
      const multiplier = subscriptionMultipliers[subscriptionTier] || 1;
      console.log(`Multiplier: ${multiplier}`);
      finalCost = Math.round(baseCost * multiplier);
      console.log(`Final Cost: ${finalCost}`);

      // Check if the subscription has enough credits
      if (subscription.credits < finalCost) {
        console.log("Insufficient Credits");
        return false; // Insufficient credits
      }

      // Deduct the credits
      const newCredits = subscription.credits - finalCost;

      // Increment feature usage
      const updatedFeaturesUsage: FeaturesUsage = {
        ...subscription.featuresUsage,
        [combinedKey]: {
          count: (subscription.featuresUsage[combinedKey]?.count || 0) + 1,
          creditsUsed: (subscription.featuresUsage[combinedKey]?.creditsUsed || 0) + finalCost,
        },
      };

      // Update subscription via API
      const updateResponse = await axios.post(`/api/resource/subscriptions/update`, {
        subscriptionId,
        updates: {
          credits: newCredits,
          featuresUsage: updatedFeaturesUsage,
        },
      });

      if (updateResponse.status !== 200) {
        console.error("Failed to update subscription credits.");
        return false;
      }

      // Handle credit threshold notifications
      await handleCreditThresholdNotifications(userId, newCredits, subscriptionTier);
    }

    // Log user action
    await logUserAction({
      subjectId: userId,
      orgId: orgId,
      action,
      feature,
      resourceId: '', // Provide if applicable
      creditsUsed: finalCost,
      createdAt: new Date(),
    });

    console.log("Credits Deduction - End");

    return finalCost;
  } catch (error: any) {
    console.error('Error in deductCredits:', error);
    return false;
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

/**
 * Fetches user actions from the user_actions resource.
 * @returns An array of UserAction objects.
 */
export async function getUserActions(): Promise<UserAction[]> {
  try {
    const response = await fetch('/api/resource/user_actions');
    if (!response.ok) {
      throw new Error('Failed to fetch user actions');
    }
    const data = await response.json();
    console.log(JSON.stringify(data), "dataaaa");
    return data.actions as UserAction[];
  } catch (error: any) {
    console.error('Error fetching user actions:', error);
    toast.error('Failed to fetch user actions.');
    return [];
  }
}
