// app/api/profiles/[type]/[id]/route.ts

import { NextResponse } from 'next/server';
import getESResourceById from '@/app/actions/getESResourceById';
import { getUserAttributes } from '@/lib/auth';
import { checkFeatureLimit } from '@/lib/limits';
import { deductCreditsAndIncrementUsage } from '@/lib/credits';
import { incrementFeatureCount } from '@/lib/user';
import { logUserAction } from '@/lib/logging';
import { evaluateAccess } from '@/lib/policyEvaluation';
import { getActionFeatureKey } from '@/lib/featureUtils';
import { FeatureKey, ActionFeatureKey } from '@/config/featuresConfig';
import { formatError } from '@/lib/errorFormatter'; // Import the error formatter
import { handleApiError } from '@/lib/errorHandler'; // Import the centralized error handler

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
      const errorResponse = formatError('AUTHENTICATION_FAILURE', 'Please log in to continue.');
      return NextResponse.json(errorResponse, { status: 401 });
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
      const errorResponse = formatError('ACCESS_DENIED_BY_POLICY', 'You do not have permission to perform this action.');
      return NextResponse.json(errorResponse, { status: 403 });
    }

    // Get the ActionFeatureKey
    const actionFeatureKey = getActionFeatureKey(action, resourceType);
    if (!actionFeatureKey) {
      console.error(`❌ No ActionFeatureKey mapping found for action: ${action}, resourceType: ${resourceType}`);
      const errorResponse = formatError('INVALID_FEATURE', 'The requested feature is invalid.');
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Get the corresponding FeatureKey
    const featureKey = actionFeatureKey.replace(/^(Create|Read|Edit|Delete)/, '') as FeatureKey;

    // Check feature limit and deduct credits
    const canProceed = await checkFeatureLimit({ userId, feature: actionFeatureKey }, subscription);
    if (!canProceed) {
      const errorResponse = formatError('PROFILE_LIMIT_REACHED', 'You have reached your profile view limit.');
      return NextResponse.json(errorResponse, { status: 403 });
    }

    const deductParams = {
      userId,
      orgId,
      action,
      actionFeatureKey,
      subscriptionId: subscription.subscriptionId,
    };

    const creditsDeducted = await deductCreditsAndIncrementUsage(deductParams, subscription);
    if (!creditsDeducted.success) {
      const errorResponse = formatError('CREDIT_DEDUCTION_FAILED', creditsDeducted.error || 'Failed to deduct credits.');
      return NextResponse.json(errorResponse, { status: 403 });
    }

    // Determine index name
    const indexName = type === 'athlete' ? 'athletes_triples' : 'brands_triples';

    // Fetch the profile
    const resource = await getESResourceById(indexName, id);
    if (!resource) {
      console.log(`❌ Resource not found for resourceId: ${resourceUri}, resourceType: ${resourceType}`);
      const errorResponse = formatError('RESOURCE_NOT_FOUND', 'The requested profile was not found.');
      return NextResponse.json(errorResponse, { status: 404 });
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
    handleApiError(error);
    const errorResponse = formatError('INTERNAL_SERVER_ERROR', 'An unexpected error occurred.');
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
