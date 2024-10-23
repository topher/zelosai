// lib/credits.ts

import { toast } from 'react-hot-toast';
import { baseCreditCosts, subscriptionMultipliers } from '../config/creditConfig';
import { getUserById, updateUserCredits, getUserSubscriptionTier } from '@/lib/user';
import { sendCreditNotification } from '@/lib/notifications';
import { subscriptionTiers } from '../config/subscriptionTiers'; // Ensure this export exists
import { getSubscriptionByUserId, updateSubscriptionCredits } from './subscription';
import { SubscriptionTier } from '@/app/types';
import { toastWarning } from '@/lib/toastHelpers'; // Import the helper
import { logUserAction } from './logging';

interface DeductCreditsParams {
  userId: string;
  action: string;
  resourceType?: string;
  feature?: string;
}

export async function deductCredits(params: DeductCreditsParams): Promise<number | false> {
  const { userId, action, resourceType, feature } = params;

  console.log("Credits Deduction - Start");
  console.log(`User ID: ${userId}`);
  console.log(`Action: ${action}`);
  console.log(`Resource Type: ${resourceType}`);
  console.log(`Feature: ${feature}`);

  // Fetch user subscription
  const subscription = await getSubscriptionByUserId(userId);
  if (!subscription) {
    console.error("Subscription not found for user:", userId);
    return false;
  }
  const subscriptionTier = subscription.subscriptionTier as SubscriptionTier;

  console.log(`Subscription Tier: ${subscriptionTier}`);

  let finalCost: number;

  // Check for Enterprise tier
  if (subscriptionTier === 'ENTERPRISE') {
    console.log("Enterprise Tier - No Credits Deducted");
    finalCost = 0; // No credits deducted
  } else {
    // Calculate the cost based on action and resource type
    const key = `${action}:${resourceType}`;
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
    await updateSubscriptionCredits(subscription.id, newCredits);
    console.log(`Credits After Deduction: ${newCredits}`);

    // Handle credit threshold notifications
    await handleCreditThresholdNotifications(userId, newCredits, subscriptionTier);
  }

  // Log user action
  await logUserAction({
    userId,
    action,
    resourceType,
    creditsUsed: finalCost,
    timestamp: new Date(),
  });

  console.log("Credits Deduction - End");

  return finalCost;
}




function getInitialCreditsForUser(user: { subscriptionTier: SubscriptionTier }): number {
  // Determine initial credits based on subscription tier
  const tier = user.subscriptionTier;
  const subscriptionTier = subscriptionTiers[tier];
  return typeof subscriptionTier.credits.monthly === 'number'
    ? subscriptionTier.credits.monthly
    : Number.MAX_SAFE_INTEGER; // Handle 'unlimited'
}

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
    toastWarning('You have 50% of your credits remaining.');
    console.log("Notification Sent: 50% Credits Remaining");
  }
}