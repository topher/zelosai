// lib/auth.ts

import { currentUser, getAuth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { NextApiRequest } from 'next';
import { getSubscriptionById } from './subscription';
import { Subscription } from '@/app/types';

export interface AuthContext {
  userId: string | null;
  orgId: string | null;
  orgRole: string | null;
}

export function getAuthContext(req: NextApiRequest): AuthContext {
  const { userId, orgId, orgRole } = getAuth(req);
  return { userId, orgId, orgRole };
}

export async function getUserAttributes(
  req: Request | NextRequest | NextApiRequest,
  authContext?: { userId: string | null; orgId: string | null; orgRole: string | null },
  testUserAttributes?: Record<string, any>
): Promise<Record<string, any>> {
  if (testUserAttributes) {
    console.log("🧪 Using test user attributes:", testUserAttributes);
    return testUserAttributes;
  }

  let userId = '';
  let orgId = null;
  let orgRole = null;

  if (authContext) {
    userId = authContext.userId || '';
    orgId = authContext.orgId;
    orgRole = authContext.orgRole;
  } else if ('nextUrl' in req) {
    // Middleware request
    const auth = getAuth(req as NextRequest);
    userId = auth.userId || '';
    orgId = auth.orgId;
    orgRole = auth.orgRole;
  } else {
    // API route request
    const auth = getAuth(req as NextApiRequest);
    userId = auth.userId || '';
    orgId = auth.orgId;
    orgRole = auth.orgRole;
  }

  if (!userId) {
    console.warn('No authenticated user found.');
    return {
      role: 'guest',
      userId: 'unknown',
      groups: [],
      orgId: null,
      orgRole: null,
      subscription: null,
    };
  }

  let subscription: Subscription | null = null;

  if (orgId) {
    // Fetch organization's subscription
    const organization = await clerkClient.organizations.getOrganization({ organizationId: orgId });
    const orgSubscriptionId = organization.privateMetadata?.subscriptionId;

    // Type Guard: Ensure orgSubscriptionId is a string
    if (typeof orgSubscriptionId === 'string') {
      subscription = await getSubscriptionById(orgSubscriptionId);
    } else {
      console.warn('Organization subscriptionId is not a string:', orgSubscriptionId);
    }
  } else {
    // Fetch user's personal subscription
    const user = await clerkClient.users.getUser(userId);
    const userSubscriptionId = user.privateMetadata?.subscriptionId;

    // Type Guard: Ensure userSubscriptionId is a string
    if (typeof userSubscriptionId === 'string') {
      subscription = await getSubscriptionById(userSubscriptionId);
    } else {
      console.warn(userSubscriptionId, 'User subscriptionId is not a string:', userSubscriptionId);
    }
  }

  // Fetch user
  const user = await clerkClient.users.getUser(userId);

  // Safely extract subscriptionId from privateMetadata
  const subscriptionIdRaw = user.privateMetadata?.subscriptionId;
  let subscriptionId: string | null = null;

  if (typeof subscriptionIdRaw === 'string') {
    subscriptionId = subscriptionIdRaw;
  } else {
    console.warn('Invalid subscriptionId type:', subscriptionIdRaw);
  }

  if (subscriptionId) {
    try {
      subscription = await getSubscriptionById(subscriptionId);
    } catch (error) {
      console.error('Error fetching subscription by ID:', error);
    }
  }

  // Extract role and groups
  const role = orgRole || user.publicMetadata?.role || 'user';
  const groups = user.publicMetadata?.groups || [];

  console.log('🚀 User Attributes Retrieved:', {
    userId,
    orgId,
    orgRole,
    role,
    groups,
    subscription,
  });

  return {
    role,
    userId,
    groups,
    orgId,
    orgRole,
    subscription,
  };
}
