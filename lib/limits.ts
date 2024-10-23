// lib/limits.ts

import { countLimits } from '../config/creditConfig';
import { getUserById, getUserSubscriptionTier, incrementFeatureCount } from '@/lib/user';
import { sendLimitNotification } from '@/lib/notifications';

interface CheckLimitParams {
  userId: string;
  feature: string;
}

export async function checkFeatureLimit(params: CheckLimitParams): Promise<boolean> {
  const { userId, feature } = params;

  console.log("Feature Limit Check - Start");
  console.log(`User ID: ${userId}`);
  console.log(`Feature: ${feature}`);

  // Fetch user details
  const user = await getUserById(userId);
  const subscriptionTier = user.subscriptionTier; // Directly from user data

  console.log(`Subscription Tier: ${subscriptionTier}`);

  // Get the limit for the feature based on subscription tier
  const featureLimits = countLimits[feature];
  if (!featureLimits) {
    console.log("No Limit Defined for Feature");
    return true; // No limit defined for this feature
  }

  const limit = featureLimits[subscriptionTier];

  console.log(`Limit for Feature: ${limit}`);

  if (limit === Infinity || limit === 'unlimited') {
    console.log("Unlimited Feature");
    return true; // No limit
  }

  // Fetch current count
  const currentCount = user.featuresUsage[feature] || 0;

  console.log(`Current Count: ${currentCount}`);

  if (currentCount >= limit) {
    console.log("Feature Limit Reached");
    // Notify the user
    await sendLimitNotification(userId, `You have reached the limit for ${feature}. Please upgrade your subscription or purchase additional credits.`);
    return false; // Limit reached
  }

  // Increment the usage count
  await incrementFeatureCount(userId, feature);

  console.log("Feature Limit Check - End");

  return true;
}
