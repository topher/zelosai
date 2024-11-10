// app/api/profiles/[type]/[id]/route.ts

import { NextResponse } from 'next/server';
import getESResourceById from '@/app/actions/getESResourceById';
import { getUserAttributes } from '@/lib/auth';
import { checkFeatureLimit } from '@/lib/limits';
import { deductCreditsAndIncrementUsage } from '@/lib/credits';
import { incrementFeatureCount } from '@/lib/user';
import { logUserAction } from '@/lib/logging';
import { evaluateAccess } from '@/lib/policyEvaluation';
import { getActionFeatureKey } from '@/lib/featureUtils'; // Updated import
import { FeatureKey, ActionFeatureKey } from '@/config/featuresConfig'; // Updated import

export async function GET(
  request: Request,
  { params }: { params: { type: 'athlete' | 'brand'; id: string } }
) {
  const { type, id } = params;

  try {
    // Get user attributes
    const userAttributes = await getUserAttributes(request);
    const { userId, orgId, subscription } = userAttributes;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Set correct resourceType based on type
    const action = 'read';
    const resourceType = type === 'athlete' ? 'ProfileAthlete' : 'ProfileBrand';

    // Construct the full URI for the resource
    const uriPrefix = type === 'athlete' ? 'knowledge/athlete' : 'knowledge/brand';
    const resourceUri = `http://zelos.ai/${uriPrefix}/${id}`;

    // Check access based on policies
    const accessGranted = await evaluateAccess({
      userId,
      action,
      resourceId: resourceUri,
      resourceType,
      userAttributes,
      subscription,
    });

    if (!accessGranted) {
      return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
    }

    // Get the ActionFeatureKey
    const actionFeatureKey = getActionFeatureKey(action, resourceType);
    if (!actionFeatureKey) {
      console.error(`❌ No ActionFeatureKey mapping found for action: ${action}, resourceType: ${resourceType}`);
      return NextResponse.json({ error: 'Invalid Feature' }, { status: 400 });
    }

    // Get the corresponding FeatureKey
    const featureKey = actionFeatureKey.replace(/^(Create|Read|Edit|Delete)/, '') as FeatureKey;

    // Check feature limit and deduct credits
    const canProceed = await checkFeatureLimit({ userId, feature: actionFeatureKey }, subscription);
    if (!canProceed) {
      return NextResponse.json({ error: 'Profile view limit reached' }, { status: 403 });
    }

    const creditsDeducted = await deductCreditsAndIncrementUsage(
      {
        userId,
        orgId,
        action,
        actionFeatureKey,
      },
      subscription
    );

    if (!creditsDeducted.success) {
      return NextResponse.json({ error: creditsDeducted.error || 'Insufficient credits' }, { status: 403 });
    }

    // Determine index name
    const indexName = type === 'athlete' ? 'athletes_triples' : 'brands_triples';

    // Fetch the profile
    const resource = await getESResourceById(indexName, id);
    if (!resource) {
      console.log(`❌ Resource not found for resourceId: ${resourceUri}, resourceType: ${resourceType}`);
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Increment feature view count
    await incrementFeatureCount(userId, actionFeatureKey, subscription.subscriptionId);

    // Log user action
    await logUserAction({
      subjectId: userId,
      orgId,
      action,
      featureKey,
      resourceId: id,
      creditsUsed: creditsDeducted.creditsDeducted || 0,
      createdAt: new Date(),
    });

    // Return the resource
    return NextResponse.json(resource, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
