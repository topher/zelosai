// app/api/subscriptions/route.ts

import { NextResponse } from 'next/server';
import { getUserAttributes } from '@/lib/auth'; // Ensure this function extracts userId and orgId
import { getSubscription } from '@/lib/subscription';
import type { NextRequest } from 'next/server';
import { Subscription } from '@/app/types';

export async function GET(req: NextRequest) {
  try {
    // Extract user attributes from the request
    const { userId, orgId } = await getUserAttributes(req);

    if (!userId || userId === 'unknown') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the appropriate subscription
    const subscription: Subscription | null = await getSubscription(orgId, userId);

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    console.log(`Returning subscription: ${subscription.subscriptionId} for user "${userId}" and org "${orgId}"`);
    return NextResponse.json({ subscription }, { status: 200 }); // Return under 'subscription' key
  } catch (error: any) {
    console.error(`Error fetching subscription:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
 