// /app/api/clerk-webhook/route.ts

import { NextResponse } from 'next/server';
import { createFreeTierSubscriptionForUser, createOrganizationSubscription } from '@/lib/subscription';
import { SubscriptionTier } from '@/config/featuresConfig';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { isWebhookProcessed, markWebhookAsProcessed } from '@/lib/webhookUtils';
import { createProfile } from '@/lib/profile'; // Import profile creation function
import { ResourceType } from '@/config/resourceTypes';
import { generateSubjectId } from '@/lib/subjectIdGenerator'; // Function to generate subjectId

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error('CLERK_WEBHOOK_SECRET is not defined in environment variables.');
}

export async function POST(request: Request) {
  console.log('Webhook handler invoked');
  try {
    const body = await request.text();
    console.log('Webhook request body:', body);
    const headerList = headers();

    const svixHeaders = {
      'svix-id': headerList.get('svix-id') || '',
      'svix-timestamp': headerList.get('svix-timestamp') || '',
      'svix-signature': headerList.get('svix-signature') || '',
    };

    const svixId = svixHeaders['svix-id'];
    console.log(`Received svix-id: ${svixId}`);

    if (!svixId) {
      console.error('Missing svix-id in webhook headers.');
      return NextResponse.json({ error: 'Missing svix-id header.' }, { status: 400 });
    }

    if (await isWebhookProcessed(svixId)) {
      console.warn(`Webhook event "${svixId}" has already been processed.`);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const wh = new Webhook(webhookSecret);
    let event;

    try {
      event = wh.verify(body, svixHeaders) as any;
      console.log(`Webhook event verified: ${event.type}`);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
    }

    switch (event.type) {
      case 'user.created':
        {
          const userId = event.data.id;
          const email = event.data.email_addresses?.[0]?.email_address || 'unknown@example.com'; // Fetch email if available
          console.log(`Handling user.created event for userId: ${userId}`);
          // Create a user profile
          await createProfile({
            id: `profile_${userId}`,
            accountId: event.data.organization_id || 'default_org_id', // Assign default or fetched orgId
            resourceType: ResourceType.ProfileUser,
            ownerId: userId,
            createdAt: new Date(),
            name: event.data.first_name + ' ' + event.data.last_name,
            tags: ['user'],
            visibility: 'private',
            subjectId: generateSubjectId(ResourceType.ProfileUser, `profile_${userId}`),
            type: 'user',
            email: email,
          });
          // Create free tier subscription
          await createFreeTierSubscriptionForUser(userId);
        }
        break;

      case 'organization.created':
        {
          const orgId = event.data.id;
          const orgName = event.data.name || 'Unnamed Organization';
          console.log(`Handling organization.created event for orgId: ${orgId}`);
          // Create an organization profile
          await createProfile({
            id: `profile_${orgId}`,
            accountId: orgId,
            resourceType: ResourceType.ProfileBrand, // Assuming organizations are brands
            ownerId: event.data.owner_id || 'system_owner_id', // Assign appropriate ownerId
            createdAt: new Date(),
            name: orgName,
            tags: ['organization', 'brand'],
            visibility: 'public',
            subjectId: generateSubjectId(ResourceType.ProfileBrand, `profile_${orgId}`),
            type: 'brand'
          });
          // Create organization subscription
          const subscriptionTier = SubscriptionTier.PRO;
          await createOrganizationSubscription(orgId, subscriptionTier);
        }
        break;

      default:
        console.warn(`Unhandled event type: ${event.type}`);
        break;
    }

    await markWebhookAsProcessed(svixId);
    console.log(`Webhook event "${svixId}" processed and marked.`);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error handling Clerk webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
