// lib/stripeWebhookHandler.ts

import Stripe from 'stripe';
import { handleUpgradeSuccess } from '@/lib/subscription';
import { SubscriptionTier } from '@/config/featuresConfig';

export async function handleStripeWebhook(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier as SubscriptionTier;

      if (!userId || !tier) {
        console.warn('Missing userId or tier in session metadata.');
        return;
      }

      try {
        // Use handleUpgradeSuccess to update the subscription
        await handleUpgradeSuccess(userId, tier);
        console.log(`✅ Subscription tier updated to ${tier} for user ${userId}.`);
      } catch (error) {
        console.error(`❌ Failed to update subscription tier for user ${userId}:`, error);
      }
      break;
    }

    // Handle other event types as needed

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}
