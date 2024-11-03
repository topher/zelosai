// app/api/profiles/[type]/[id]/route.ts

import { NextResponse } from 'next/server';
import getESResourceById from '@/app/actions/getESResourceById';
import { getUserAttributes } from '@/lib/auth';
import { checkFeatureLimit } from '@/lib/limits';
import { deductCredits } from '@/lib/credits';
import { incrementFeatureCount } from '@/lib/user';
import { logUserAction } from '@/lib/logging';
import { evaluateAccess } from '@/lib/policyEvaluation';
import { getActionFeatureKey } from '@/lib/actionResourceMapping';
import { FeatureKey } from '@/config/featuresConfig';

export async function GET(
  request: Request,
  { params }: { params: { type: 'athlete' | 'brand'; id: string } }
) {
  const { type, id } = params;

  try {
    // Get user attributes
    const userAttributes = await getUserAttributes(request);
    const { userId, orgId, orgRole, subscription } = userAttributes;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Define the action and resource type
    const action = 'read';
    const resourceType = 'profiles';

    // Check access based on policies
    const accessGranted = await evaluateAccess({
      userId,
      action,
      resourceId: id,
      resourceType,
      userAttributes,
      subscription,
    });

    if (!accessGranted) {
      return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
    }

    // Check feature limit and deduct credits
    const featureKey = getActionFeatureKey(action, type);
    const canProceed = await checkFeatureLimit({ userId, feature: featureKey });
    if (!canProceed) {
      return NextResponse.json({ error: 'Profile view limit reached' }, { status: 403 });
    }

    const creditsDeducted = await deductCredits({ 
      userId, 
      orgId, 
      action, 
      resourceType, 
      feature: featureKey, 
      subscriptionId: subscription.subscriptionId 
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

    // Increment feature view count
    await incrementFeatureCount(userId, featureKey);

    // Log user action
    await logUserAction({
      subjectId: userId,
      orgId,
      action,
      resourceId: id,
      creditsUsed: creditsDeducted,
      createdAt: new Date(),
      feature: FeatureKey.Recommendations
    });

    // Return the resource
    return NextResponse.json(resource, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
