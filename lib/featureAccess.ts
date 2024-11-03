// // lib/featureAccess.ts

// import { SubscriptionTier, Subscription } from '@/app/types';
// import { subscriptionTiers } from '@/config/subscriptionTiers';
// import { FeatureCategory, FeatureKey, features } from '@/lib/features';
// import client from '@/lib/elasticsearchClient'; // Adjust the path as needed
// import { UpdateResponse } from '@elastic/elasticsearch/lib/api/types';
// import { GetResponse } from '@elastic/elasticsearch/lib/api/types';

// // Define all possible access keys based on FeatureKey enum
// export type AccessKey = FeatureKey;

// // Base interface with all possible keys and an index signature
// export interface AccessRulesBase {
//   athletes?: boolean;
//   contracts?: boolean;
//   models?: boolean;
//   brands?: boolean;
//   connectors?: number | 'unlimited';
//   storageLimit?: string;
//   topics?: boolean;
//   infoAssets?: boolean;
//   accessDefault?: boolean;
//   safety?: boolean;
//   // Allow additional properties if needed
//   [key: string]: boolean | number | string | 'unlimited' | undefined;
// }

// // Simplify AccessRules to be AccessRulesBase only
// export type AccessRules = AccessRulesBase;

// /**
//  * Checks if the user has access based on the rules and key.
//  * @param rules - The access rules.
//  * @param key - The feature key to check.
//  * @returns Boolean indicating access.
//  */
// export function hasAccess(rules: AccessRules, key: AccessKey): boolean {
//   if (key in rules) {
//     return Boolean(rules[key]);
//   }
//   return false;
// }

// /**
//  * Determines if a feature is allowed based on the subscription tier and current usage.
//  *
//  * @param subscriptionTier - The user's subscription tier.
//  * @param subscriptionId - The ID of the subscription.
//  * @param featureKey - The key of the feature within the category.
//  * @returns Boolean indicating if the feature is allowed.
//  */
// const isFeatureAllowed = (featureKey: FeatureKey): boolean => {
//     const featureLimit = tierConfig.featuresUsage[featureKey];
//     const currentUsage = featuresUsage[featureKey] || 0;
  
//     console.log(`Checking access for featureKey: ${featureKey}`);
//     console.log(`Feature Limit: ${featureLimit}, Current Usage: ${currentUsage}`);
  
//     if (featureLimit === undefined) {
//       console.warn(`Feature limit for ${featureKey} is undefined, returning false.`);
//       return false;
//     }
//     if (featureLimit === -1) return true; // Unlimited access
  
//     return currentUsage < featureLimit;
//   };
  

// /**
//  * Retrieves the current usage of a specific feature for a given subscription.
//  *
//  * @param subscriptionId - The ID of the subscription.
//  * @param featureKey - The key of the feature to retrieve usage for.
//  * @returns The current usage count or null if not found.
//  */
// export async function getCurrentUsage(
//   subscriptionId: string,
//   featureKey: FeatureKey
// ): Promise<number | null> {
//   try {
//     const response: GetResponse<Subscription> = await client.get({
//       index: 'subscription_tiers',
//       id: subscriptionId,
//     });

//     if (!response.found) {
//       console.warn(`Subscription with ID ${subscriptionId} not found.`);
//       return null;
//     }

//     const subscription = response._source;

//     if (!subscription) {
//       console.warn(`Subscription data for ID ${subscriptionId} is missing.`);
//       return null;
//     }

//     const currentUsage = subscription.featuresUsage[featureKey];

//     if (currentUsage === undefined) {
//       console.warn(`Feature ${featureKey} not found in subscription ${subscriptionId}.`);
//       return null;
//     }

//     return currentUsage;
//   } catch (error) {
//     console.error(`Error fetching current usage for subscription ${subscriptionId}:`, error);
//     return null;
//   }
// }

// /**
//  * Increments the usage count of a specific feature for a given subscription.
//  *
//  * @param subscriptionId - The ID of the subscription.
//  * @param featureKey - The key of the feature to increment.
//  * @returns Boolean indicating success or failure.
//  */
// export async function incrementFeatureUsage(
//   subscriptionId: string,
//   featureKey: FeatureKey
// ): Promise<boolean> {
//   try {
//     const response: UpdateResponse = await client.update({
//       index: 'subscription_tiers',
//       id: subscriptionId,
//       body: {
//         script: {
//           source: 'ctx._source.featuresUsage[params.featureKey] += params.increment',
//           params: { featureKey, increment: 1 },
//           lang: 'painless',
//         },
//       },
//     });

//     return response.result === 'updated' || response.result === 'noop';
//   } catch (error: any) {
//     console.error(
//       `Error incrementing usage for feature ${featureKey} in subscription ${subscriptionId}:`,
//       error
//     );
//     return false;
//   }
// }
