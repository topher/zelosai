// lib/paymentProcessor.ts

import Stripe from 'stripe';
import { SubscriptionTier } from '@/config/featuresConfig';
import stripeClient from '@/lib/stripe';

/**
 * Creates a Stripe Checkout session for subscription upgrades.
 * @param userId - The ID of the user.
 * @param tier - The desired subscription tier.
 * @returns A PaymentSession object containing the checkout URL.
 */
export async function createPaymentSession(userId: string, tier: SubscriptionTier): Promise<{ url: string }> {
  try {
    // Define price IDs for different tiers in Stripe dashboard
    const priceIdMap: { [key in SubscriptionTier]: string } = {
      FREE: '', // No payment needed for free tier
      PRO: process.env.STRIPE_PRO_PRICE_ID || '',
      ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID || '',
    };

    if (!priceIdMap[tier]) {
      throw new Error(`Price ID for tier "${tier}" is not defined.`);
    }

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceIdMap[tier],
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        tier, // Pass the desired tier
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
    });

    console.log(`✅ Created Stripe Checkout session for userId: ${userId}, tier: ${tier}`);
    return { url: session.url as string };
  } catch (error: any) {
    console.error('❌ Error creating payment session:', error);
    throw new Error('Failed to create payment session.');
  }
}
