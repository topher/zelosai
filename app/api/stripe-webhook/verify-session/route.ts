// app/api/stripe-webhook/verify-session/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import stripeClient from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId.' }, { status: 400 });
    }

    const session = await stripeClient.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ success: false }, { status: 200 });
    }
  } catch (error: any) {
    console.error('❌ Error verifying Stripe session:', error);
    return NextResponse.json({ error: 'Failed to verify session.' }, { status: 500 });
  }
}
