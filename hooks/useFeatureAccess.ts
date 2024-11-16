// hooks/useFeatureAccess.ts

import { Subscription } from '@/app/types';
import { FeatureKey, ActionFeatureKey, Action } from '@/config/featuresConfig';
import { features } from '@/config/features';
import { getActionFeatureKey } from '@/lib/featureUtils';

/**
 * Custom hook to manage feature access based on subscription.
 * @param subscription - The user's subscription data.
 * @returns Functions to check feature access and perform actions.
 */
export function useFeatureAccess(subscription: Subscription | null) {
  
  /**
   * Checks if a user is allowed to perform a specific action on a feature.
   * @param featureKey - The base feature key.
   * @param action - The action being performed.
   * @returns A boolean indicating if the action is allowed.
   */
  const isFeatureAllowed = async (
    featureKey: FeatureKey,
    action: Action
  ): Promise<boolean> => {
    if (!subscription) return false;

    // Retrieve the feature's metadata to get the resourceType
    const feature = features[featureKey];
    if (!feature) return false;

    console.log("🧐", action, featureKey)


    // Get the corresponding ActionFeatureKey
    const actionFeatureKey = getActionFeatureKey(action, featureKey);
    if (!actionFeatureKey) return false;

    console.log("🧐 Retrieve the feature's metadata to get the resourceType", subscription.featuresUsage, actionFeatureKey)


    // Retrieve usage data for the specific ActionFeatureKey
    const featureUsage = subscription.featuresUsage[actionFeatureKey];
    if (!featureUsage) return false;





    // Find the action configuration from the feature
    const actionConfig = feature.actions.find((a: { action: string; }) => a.action === action);
    if (!actionConfig) return false;

    // Determine the tier index based on the subscription tier
    const tierIndex = getTierIndex(subscription.subscriptionTier);

    // Get the current usage count for the action
    const currentUsage = featureUsage.count;

    // Compare current usage with the resource limits
    return currentUsage < actionConfig.resourceLimits[tierIndex];
  };

  /**
   * Performs an action by calling the backend API to handle credit deduction and usage increment.
   * @param featureKey - The base feature key.
   * @param action - The action being performed.
   * @returns An object indicating success and a message.
   */
  const performAction = async (
    featureKey: FeatureKey,
    action: Action
  ): Promise<{ success: boolean; message: string }> => {
    const allowed = await isFeatureAllowed(featureKey, action);
    if (!allowed) {
      return { success: false, message: 'Action not allowed due to limits or insufficient credits.' };
    }

    // Perform the action via backend API
    try {
      const response = await fetch('/api/perform-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featureKey, action }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return { success: true, message: 'Action performed successfully.' };
      } else {
        return { success: false, message: data.error || 'Failed to perform action.' };
      }
    } catch (error) {
      console.error('Error performing action:', error);
      return { success: false, message: 'Internal server error.' };
    }
  };

  /**
   * Maps subscription tier to its corresponding index in resourceLimits.
   * @param tier - The subscription tier.
   * @returns The index corresponding to the tier.
   */
  const getTierIndex = (tier: string): number => {
    switch (tier.toUpperCase()) {
      case 'FREE':
        return 0;
      case 'PRO':
        return 1;
      case 'ENTERPRISE':
        return 2;
      default:
        return 0;
    }
  };

  return { isFeatureAllowed, performAction };
}
