'use server';

import { auth, currentUser } from '@clerk/nextjs/server';

export async function getUserAttributes(testUserAttributes?: Record<string, any>): Promise<Record<string, any>> {
  if (testUserAttributes) {
    console.log("🧪 Using test user attributes:", testUserAttributes);
    return testUserAttributes;
  }

  const { userId, orgId, orgRole } = auth();

  if (!userId) {
    console.warn('No authenticated user found.');
    return {
      role: 'guest',
      userId: 'unknown',
      groups: [],
      orgId: null,
      orgRole: null,
    };
  }

  const user = await currentUser();

  if (!user) {
    console.warn(`No user object found for userId: ${userId}`);
    return {
      role: 'user',
      userId,
      groups: [],
      orgId,
      orgRole,
    };
  }

  const role = user.publicMetadata?.role || 'user';
  const groups = user.publicMetadata?.groups || [];

  console.log("🚀 User Attributes Retrieved:", {
    userId,
    orgId,
    orgRole,
    role,
    groups,
  });

  return {
    role,
    userId,
    groups,
    orgId,
    orgRole,
  };
}