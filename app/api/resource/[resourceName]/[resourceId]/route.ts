// app/api/resource/[resourceName]/[resourceId]/route.ts

import { NextResponse } from 'next/server';
import { getUserAttributes } from '@/lib/auth';
import { checkFeatureLimit } from '@/lib/limits';
import { deductCreditsAndIncrementUsage } from '@/lib/credits';
import { logUserAction } from '@/lib/logging';
import { getResourceById, createResource, updateResource, deleteResource } from '@/lib/dataFetching';
import { incrementFeatureCount } from '@/lib/user';
import { evaluateAccess } from '@/lib/policyEvaluation';
import { Action, FeatureKey, ActionFeatureKey } from '@/config/featuresConfig';
import { getActionFeatureKey, getResourceTypeByResourceName, getFeatureKeyFromResourceName } from '@/lib/featureUtils';
import { formatError } from '@/lib/errorFormatter'; // Import the error formatter
import { handleApiError } from '@/lib/errorHandler'; // Import the centralized error handler

// Exported HTTP methods
export async function GET(request: Request, { params }: { params: { resourceName: string; resourceId: string } }) {
  console.log("😜 GET Request Received");
  return handleResourceAction('read', request, params);
}

export async function POST(request: Request, { params }: { params: { resourceName: string; resourceId: string } }) {
  console.log("😜 POST Request Received");
  return handleResourceAction('create', request, params);
}

export async function DELETE(request: Request, { params }: { params: { resourceName: string; resourceId: string } }) {
  console.log("😜 DELETE Request Received");
  return handleResourceAction('delete', request, params);
}

// Adding PUT for the update/edit action
export async function PUT(request: Request, { params }: { params: { resourceName: string; resourceId: string } }) {
  console.log("😜 PUT Request Received");
  return handleResourceAction('update', request, params);
}

// Handler Function
async function handleResourceAction(
  action: Action,
  request: Request,
  params: { resourceName: string; resourceId: string }
) {
  try {
    const { resourceName, resourceId } = params;
    console.log("😜 Handling Action:", action, "for Resource:", resourceName, resourceId);

    // Fetch user attributes
    const userAttributes = await getUserAttributes(request);
    const { userId, orgId, subscription } = userAttributes;

    if (!userId) {
      const errorResponse = formatError('AUTHENTICATION_FAILURE', 'Please log in to continue.');
      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Get resourceType from resourceName
    const resourceType = getResourceTypeByResourceName(resourceName);
    if (!resourceType) {
      console.error(`No resourceType mapping found for resourceName: ${resourceName}`);
      const errorResponse = formatError('INVALID_RESOURCE_TYPE', 'The provided resource type is invalid.');
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Map resourceName to FeatureKey using utility function
    const featureKey = getFeatureKeyFromResourceName(resourceName);
    if (!featureKey) {
      console.error(`No FeatureKey mapping found for resourceName: ${resourceName}`);
      const errorResponse = formatError('INVALID_FEATURE', 'The requested feature is invalid.');
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Get the ActionFeatureKey
    const actionFeatureKey = getActionFeatureKey(action, featureKey); // Pass FeatureKey here
    if (!actionFeatureKey) {
      console.error(`❌ No ActionFeatureKey mapping found for action: ${action}, featureKey: ${featureKey}`);
      const errorResponse = formatError('INVALID_FEATURE', 'The requested feature is invalid.');
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Check access based on policies
    const accessGranted = await evaluateAccess({
      userId,
      action,
      resourceId,
      resourceType,
      userAttributes,
      subscription,
    });

    if (!accessGranted) {
      const errorResponse = formatError('ACCESS_DENIED_BY_POLICY', 'You do not have permission to perform this action.');
      return NextResponse.json(errorResponse, { status: 403 });
    }

    // Check feature limit and deduct credits
    const canProceed = await checkFeatureLimit({ userId, feature: actionFeatureKey }, subscription);
    if (!canProceed) {
      // Determine specific error based on featureKey
      let errorCode = 'FEATURE_LIMIT_REACHED';
      let errorMessage = 'You have reached your usage limit for this feature.';

      if (resourceName.toLowerCase().includes('profile')) {
        errorCode = 'PROFILE_LIMIT_REACHED';
        errorMessage = 'You have reached your profile view limit.';
      }

      const errorResponse = formatError(errorCode, errorMessage);
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

    // Handle the action
    let result;
    if (action === 'read') {
      result = await getResourceById(resourceName, resourceId);
      if (!result) {
        const errorResponse = formatError('RESOURCE_NOT_FOUND', 'The requested resource was not found.');
        return NextResponse.json(errorResponse, { status: 404 });
      }
    } 
     else if (action === 'update') {
      const updatedData = await request.json();
      result = await updateResource(resourceName, resourceId, updatedData);
      if (!result) {
        const errorResponse = formatError('RESOURCE_UPDATE_FAILED', 'Failed to update the resource.');
        return NextResponse.json(errorResponse, { status: 404 });
      }
    } else if (action === 'delete') {
      const deleteSuccess = await deleteResource(resourceName, resourceId);
      if (!deleteSuccess) {
        const errorResponse = formatError('RESOURCE_DELETION_FAILED', 'Failed to delete the resource.');
        return NextResponse.json(errorResponse, { status: 404 });
      }
      result = { message: 'Resource deleted successfully.' };
    }

    // Increment feature count
    await incrementFeatureCount(userId, actionFeatureKey, subscription.subscriptionId);

    // Log user action
    await logUserAction({
      subjectId: userId,
      orgId,
      action,
      actionFeatureKey,
      resourceId,
      creditsUsed: creditsDeducted.creditsDeducted || 0,
      createdAt: new Date(),
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error(`Error handling ${action} for ${params.resourceName}/${params.resourceId}:`, error);
    handleApiError(error);
    const errorResponse = formatError('INTERNAL_SERVER_ERROR', 'An unexpected error occurred.');
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
