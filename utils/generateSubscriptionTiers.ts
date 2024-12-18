// scripts/generateSubscriptionTiers.ts

import fs from 'fs';
import path from 'path';
import { features, FeatureKey } from '@/config/featuresConfig';

const subscriptionTiers = ['FREE', 'PRO', 'ENTERPRISE'] as const;
type SubscriptionTier = typeof subscriptionTiers[number];

const generateFeaturesUsage = () => {
  const usage: Record<string, number> = {};
  features.forEach(feature => {
    feature.actions.forEach(action => {
      const key = `${action.action}${feature.key}`;
      usage[key] = 0;
    });
  });
  return usage;
};

const generateSubscriptionTiers = () => {
  const usage = generateFeaturesUsage();
  const tiersConfig: Record<
    SubscriptionTier,
    {
      monthlyCreditLimit: number;
      featuresUsage: Record<string, number>;
    }
  > = {
    FREE: {
      monthlyCreditLimit: 100,
      featuresUsage: { ...usage },
    },
    PRO: {
      monthlyCreditLimit: 500,
      featuresUsage: { ...usage },
    },
    ENTERPRISE: {
      monthlyCreditLimit: 1000,
      featuresUsage: { ...usage },
    },
  };
  return tiersConfig;
};

const tiers = generateSubscriptionTiers();
const fileContent = `// config/subscriptionTiers.ts

import { SubscriptionTier } from '@/app/types';
import { FeatureKey, getActionKey } from '@/config/featuresConfig';

/**
 * Subscription Tiers Configuration
 * Defines monthly credit limits and initializes feature usage counts for each tier.
 */
export const subscriptionTiers: Record<
  SubscriptionTier,
  {
    monthlyCreditLimit: number;
    featuresUsage: Record<string, number>;
  }
> = ${JSON.stringify(tiers, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'config', 'subscriptionTiers.ts'), fileContent);
console.log('subscriptionTiers.ts has been generated successfully.');
