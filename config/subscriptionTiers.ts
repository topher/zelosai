// config/subscriptionTiers.ts

import { actionResourceMapping } from '@/lib/actionResourceMapping'; // Correct import
import { SubscriptionTier } from '@/config/featuresConfig'; // Correct import
export interface SubscriptionTierConfig {
  credits: number;
  monthlyCreditLimit: number;
  featuresUsage: Record<string, number>;
}

/**
 * Function to generate initial features usage
 */
const generateFeaturesUsage = () => {
  const usage: Record<string, number> = {};
  // Initialize all feature-action keys to 0
  Object.keys(actionResourceMapping).forEach((key) => {
    usage[key] = 0;
  });
  return usage;
};

/**
 * Generate Subscription Tiers Configuration
 */
const generateSubscriptionTiers = () => {
  const usage = generateFeaturesUsage();
  const tiersConfig: Record<SubscriptionTier, SubscriptionTierConfig> = {
    [SubscriptionTier.FREE]: {
      credits: 0,
      monthlyCreditLimit: 100,
      featuresUsage: { ...usage },
    },
    [SubscriptionTier.PRO]: {
      credits: 0,
      monthlyCreditLimit: 500,
      featuresUsage: { ...usage },
    },
    [SubscriptionTier.ENTERPRISE]: {
      credits: 0,
      monthlyCreditLimit: 1000,
      featuresUsage: { ...usage },
    },
  };
  return tiersConfig;
};

export const subscriptionTiers = generateSubscriptionTiers();
