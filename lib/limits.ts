// lib/limits.ts

import { countLimits } from '../config/creditConfig';
import { sendLimitNotification } from '@/lib/notifications';
import { Subscription } from '@/app/types';
import { features, ActionFeatureKey, TIER_ORDER } from '@/config/featuresConfig';
import { subscriptionTiers } from '@/config/subscriptionTiers';

interface CheckLimitParams {
  userId: string;
  feature: string;
}

/**
 * Checks if a user can proceed with an action based on feature limits.
 * @param params - Contains userId and the feature (ActionFeatureKey).
 * @param subscription - The user's subscription object.
 * @returns A boolean indicating if the user can proceed.
 */
export async function checkFeatureLimit(
  params: { userId: string; feature: ActionFeatureKey },
  subscription: Subscription
): Promise<boolean> {
  const { feature } = params;
  const usage = subscription.featuresUsage[feature]?.count || 0;

  const tier = subscription.subscriptionTier;
  const tierIndex = TIER_ORDER.indexOf(tier);

  if (tierIndex === -1) {
    console.error(`Invalid subscription tier: ${tier}`);
    return false;
  }

  // Find the feature and action to get resourceLimits
  let resourceLimits: number[] | undefined;

  for (const feat of features) {
    for (const action of feat.actions) {
      if (action.actionKey === feature) {
        resourceLimits = action.resourceLimits;
        break;
      }
    }
    if (resourceLimits) break;
  }

  if (!resourceLimits) {
    console.error(`No resourceLimits found for ActionFeatureKey: ${feature}`);
    return false;
  }

  const featureLimit = resourceLimits[tierIndex];

  if (featureLimit === undefined) {
    console.error(`No feature limit defined for ActionFeatureKey: ${feature} at tier index: ${tierIndex}`);
    return false;
  }

  return usage < featureLimit;
}
