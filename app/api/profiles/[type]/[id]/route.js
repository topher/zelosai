// app/api/profiles/[type]/[id]/route.ts

import { NextResponse } from 'next/server';
import getESResourceById from '@/app/actions/getESResourceById';
import { getUserAttributes } from '@/lib/auth';
import { checkFeatureLimit } from '@/lib/limits';
import { deductCredits } from '@/lib/credits';
import { incrementFeatureCount } from '@/lib/user';
import { logUserAction } from '@/lib/logging';

export async function GET(
  request: Request,
  { params }: { params: { type: 'athlete' | 'brand'; id: string } }
) {
  const { type, id } = params;

  try {
    // Get user attributes
    const userAttributes = await getUserAttributes();
    const userId = userAttributes.userId;

    // Check feature limit
    const canViewProfile = await checkFeatureLimit({ userId, feature: 'monthlyProfileViews' });
    if (!canViewProfile) {
      return NextResponse.json({ error: 'Profile view limit reached' }, { status: 403 });
    }

    // Deduct credits
    const creditsDeducted = await deductCredits({
      userId,
      action: 'read',
      resourceType: 'ProfileView',
    });
    if (creditsDeducted === false) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
    }

    // Determine index name
    const indexName = type === 'athlete' ? 'athletes_triples' : 'brands_triples';

    // Fetch the profile
    const resource = await getESResourceById(indexName, id);
    if (!resource) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Increment profile view count
    await incrementFeatureCount(userId, 'monthlyProfileViews');

    // Log user action
    await logUserAction({
      userId,
      action: 'read',
      resourceType: 'ProfileView',
      resourceId: id,
      creditsUsed: creditsDeducted,
      timestamp: new Date(),
    });

    // Return the resource
    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
