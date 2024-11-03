// app/api/subscriptions/[subscriptionId]/route.ts

import { NextResponse, NextRequest } from 'next/server';
import { getSubscriptionById } from '@/lib/subscription';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { subscriptionId: string } }
) {
  const { subscriptionId } = params;
  console.log(`API GET /api/subscriptions/${subscriptionId} called`);

  // Authenticate the user
  const { userId } = getAuth(request);
  if (!userId) {
    console.error('Unauthorized access attempt.');
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  // Retrieve the subscriptionId from Clerk's privateMetadata
  const user = await clerkClient.users.getUser(userId);
  const userSubscriptionId = user.privateMetadata?.subscriptionId;

  console.log(`User's subscriptionId from Clerk: ${userSubscriptionId}`);

  if (!userSubscriptionId) {
    console.error('Subscription ID not found in user metadata.');
    return NextResponse.json({ error: 'Subscription ID not found for user.' }, { status: 404 });
  }

  // Ensure the requested subscriptionId matches the user's subscriptionId
  if (subscriptionId !== userSubscriptionId) {
    console.error('Forbidden: User attempting to access another subscription.');
    return NextResponse.json({ error: 'Forbidden: You do not have access to this subscription.' }, { status: 403 });
  }

  const subscription = await getSubscriptionById(subscriptionId);

  if (!subscription) {
    console.error(`Subscription with ID "${subscriptionId}" not found.`);
    return NextResponse.json({ error: 'Subscription not found.' }, { status: 404 });
  }

  console.log(`Successfully retrieved subscription for ID "${subscriptionId}".`);

  return NextResponse.json({ subscription }, { status: 200 });
}
