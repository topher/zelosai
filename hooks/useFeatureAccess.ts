// hooks/useFeatureAccess.ts

import { Subscription } from '@/app/types';
import { features as allFeatures, Feature, SubscriptionTier, FeatureKey, ActionFeatureKey } from '@/config/featuresConfig';
import { getResourceCount } from '@/lib/resource'; // Ensure correct import
import { useState, useEffect } from 'react';

export const useFeatureAccess = (subscription: Subscription | null) => {
  /**
   * Determines if a specific feature action is allowed.
   * @param featureKey - The base feature key.
   * @param action - The action being performed (e.g., 'read', 'create').
   * @returns Boolean indicating if the action is allowed.
   */
  const isFeatureAllowed = async (
    featureKey: FeatureKey,
    action: 'read' | 'create' | 'edit' | 'delete'
  ): Promise<boolean> => {
    if (!subscription) return false;

    // Find the feature object based on featureKey
    const feature: Feature | undefined = allFeatures.find(f => f.key === featureKey);
    if (!feature) {
      console.warn(`Feature "${featureKey}" not found.`);
      return false;
    }

    // Find the action configuration within the feature
    const actionConfig = feature.actions.find(a => a.action === action);
    if (!actionConfig) {
      console.warn(`Action "${action}" not found for feature "${featureKey}".`);
      return false;
    }

    // Determine the tier index based on subscription tier
    let tierIndex = 0; // FREE
    if (subscription.subscriptionTier === SubscriptionTier.PRO) tierIndex = 1;
    else if (subscription.subscriptionTier === SubscriptionTier.ENTERPRISE) tierIndex = 2;

    const resourceLimit = actionConfig.resourceLimits[tierIndex];

    // Retrieve the corresponding actionKey
    const actionKey = actionConfig.actionKey; // e.g., 'ReadGoal'

    // Retrieve feature usage based on actionKey
    const featureUsage = subscription.featuresUsage[actionKey]?.creditsUsed || 0;

    // Check if action resource limit is reached
    if (resourceLimit !== -1 && featureUsage >= resourceLimit) return false;

    // Check if enough credits are available
    if (subscription.creditsUsed + actionConfig.creditCost > subscription.monthlyCreditLimit) return false;

    // Check max resource count at feature level if applicable
    if (feature.metadata.maxResourceCount) {
      const maxCount = feature.metadata.maxResourceCount[tierIndex];
      const resourceName = feature.metadata.resourceName;
      const subscriptionId = subscription.subscriptionId;
      const orgId = subscription.organizationId;
      const userId = subscription.userId;

      // Fetch resource count via API route
      try {
        const response = await fetch(
          `/api/resource-count?resourceName=${resourceName}&orgId=${orgId}&userId=${userId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (!response.ok) {
          console.error(`Failed to fetch resource count for "${resourceName}".`);
          return false;
        }

        const data = await response.json();
        const currentResourceCount = data.count || 0;
        console.log("🤩 Current Resource Count:", maxCount, actionKey, currentResourceCount);
        if (currentResourceCount >= maxCount) return false;
      } catch (error) {
        console.error(`Error fetching resource count:`, error);
        return false;
      }
    }

    return true;
  };

  /**
   * Performs an action by calling the backend API to handle credit deduction and usage increment.
   * @param featureKey - The base feature key.
   * @param action - The action being performed.
   * @returns An object indicating success and a message.
   */
  const performAction = async (
    featureKey: FeatureKey,
    action: 'read' | 'create' | 'edit' | 'delete'
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

  return { isFeatureAllowed, performAction };
};
