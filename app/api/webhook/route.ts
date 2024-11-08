// app/api/webhooks/stripe/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import stripe from '@/lib/stripe';
import { buffer } from 'micro';
import { handleUpgradeSuccess } from '@/lib/subscription';
import { SubscriptionTier } from '@/config/featuresConfig';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  const buf = await buffer(request);
  const sig = request.headers.get('stripe-signature') || '';

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier as SubscriptionTier;

      if (userId && tier) {
        try {
          await handleUpgradeSuccess(userId, tier);
          console.log(`✅ Subscription upgraded for user ${userId} to tier ${tier}.`);
        } catch (error) {
          console.error(`❌ Error upgrading subscription for user ${userId}:`, error);
        }
      }
      break;
    // Handle other events as needed
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
