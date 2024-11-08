// app/api/subscriptions/upgrade/route.ts

import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { auth } from '@clerk/nextjs';
import { SubscriptionTier } from '@/config/featuresConfig';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tier } = await request.json();
    if (!tier) {
      return NextResponse.json({ error: 'Subscription tier is required' }, { status: 400 });
    }

    // Define your Stripe price IDs for each subscription tier
    const priceIdMap: { [key in SubscriptionTier]: string } = {
      FREE: '', // No price ID for free tier
      PRO: 'price_1QIDvUEd6P53ImPwjn4JG79c', // Replace with your actual price ID for PRO
      ENTERPRISE: 'price_abcdef1234567890', // Replace with your actual price ID for ENTERPRISE
    };

    const priceId = priceIdMap[tier as SubscriptionTier];
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid subscription tier' }, { status: 400 });
    }

    // Fetch the user's email from Clerk
    const user = await clerkClient.users.getUser(userId);
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }
    const userEmail = user.emailAddresses[0].emailAddress;

    // Create a new Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade`,
      metadata: {
        userId,
        tier,
      },
    });

    // Return the session URL to the client
    return NextResponse.json({ redirectUrl: session.url }, { status: 200 });

  } catch (error: any) {
    console.error('Error in /api/subscriptions/upgrade:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
