// /app/api/resource/[resourceName]/[resourceId]/route.ts

import { NextResponse } from 'next/server';
import { getUserAttributes } from '@/lib/auth';
import { checkFeatureLimit } from '@/lib/limits';
import { deductCreditsAndIncrementUsage } from '@/lib/credits';
import { logUserAction } from '@/lib/logging';
import { getResourceById, createResource, updateResource, deleteResource, getTriplesBySubjectId } from '@/lib/resource';
import { incrementFeatureCount } from '@/lib/user';
import { evaluateAccess } from '@/lib/policyEvaluation';
import { Action, FeatureKey } from '@/config/featuresConfig';
import { getActionFeatureKey, getFeatureKeyFromResourceName, getResourceTypeByResourceName } from '@/lib/featureUtils';
import { formatError } from '@/lib/errorFormatter';
import { handleApiError } from '@/lib/errorHandler';
import { ErrorResponse, Resource } from '@/app/types';

export async function GET(
  request: Request,
  { params }: { params: { resourceName: string; resourceId: string } }
) {
  console.log("😜 GET Request Received", JSON.stringify(params));
  return handleResourceAction('read', request, params);
}

export async function POST(
  request: Request,
  { params }: { params: { resourceName: string; resourceId: string } }
) {
  console.log("😜 POST Request Received");
  return handleResourceAction('create', request, params);
}

export async function DELETE(
  request: Request,
  { params }: { params: { resourceName: string; resourceId: string } }
) {
  console.log("😜 DELETE Request Received");
  return handleResourceAction('delete', request, params);
}

export async function PUT(
  request: Request,
  { params }: { params: { resourceName: string; resourceId: string } }
) {
  console.log("😜 PUT Request Received");
  return handleResourceAction('update', request, params);
}

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
      const errorResponse: ErrorResponse = formatError('AUTHENTICATION_FAILURE', 'Please log in to continue.');
      return NextResponse.json(errorResponse, { status: 401 });
    }

    // Get resourceType from resourceName using featureUtils
    const resourceType = getResourceTypeByResourceName(resourceName);
    if (!resourceType) {
      console.error(`No resourceType mapping found for resourceName: ${resourceName}`);
      const errorResponse: ErrorResponse = formatError('INVALID_RESOURCE_TYPE', 'The provided resource type is invalid.');
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const featureKey = getFeatureKeyFromResourceName(resourceName);

    // Get the ActionFeatureKey
    const actionFeatureKey = getActionFeatureKey(action, featureKey);
    if (!actionFeatureKey) {
      console.error(`❌ No ActionFeatureKey mapping found for action: ${action}, featureKey: ${resourceType}`);
      const errorResponse: ErrorResponse = formatError('INVALID_FEATURE', 'The requested feature is invalid.');
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
      const errorResponse: ErrorResponse = formatError('ACCESS_DENIED_BY_POLICY', 'You do not have permission to perform this action.');
      return NextResponse.json(errorResponse, { status: 403 });
    }

    // Determine if credits should be deducted based on action and resourceType
    let shouldDeductCredits = false;
    if (action === 'create' && resourceName.toLowerCase() === 'triples') {
      shouldDeductCredits = true;
    }

    // Initialize creditsDeducted with default values
    let creditsDeducted: { success: boolean; creditsDeducted: number; error: string | null } = { success: false, creditsDeducted: 0, error: null };

    // Check feature limit and deduct credits if necessary
    if (shouldDeductCredits) {
      const canProceed = await checkFeatureLimit({ userId, feature: actionFeatureKey }, subscription);
      if (!canProceed) {
        const errorResponse: ErrorResponse = formatError('FEATURE_LIMIT_REACHED', 'You have reached your usage limit for this feature.');
        return NextResponse.json(errorResponse, { status: 403 });
      }

      const deductParams = {
        userId,
        orgId,
        action,
        actionFeatureKey,
        subscriptionId: subscription.subscriptionId,
      };

      creditsDeducted = await deductCreditsAndIncrementUsage(deductParams, subscription);
      if (!creditsDeducted.success) {
        const errorResponse: ErrorResponse = formatError('CREDIT_DEDUCTION_FAILED', creditsDeducted.error || 'Failed to deduct credits.');
        return NextResponse.json(errorResponse, { status: 403 });
      }
    }

    // Handle the action
    let result;
    if (action === 'read') {
      const resourceData: Resource = await getResourceById(resourceName, resourceId);
      if (!resourceData) {
        const errorResponse: ErrorResponse = formatError('RESOURCE_NOT_FOUND', 'The requested resource was not found.');
        return NextResponse.json(errorResponse, { status: 404 });
      }

      // Fetch triples associated with the resource
      const triples = await getTriplesBySubjectId(resourceData.id);
      console.log(triples, "straight from the press")
      // Attach triples to the resource data
      result = { ...resourceData, triples };
    } else if (action === 'create') {
      const resourceData = await request.json();

      // For Triples, credits already deducted if necessary
      result = await createResource(resourceName, resourceData, resourceId);
      if (!result) {
        const errorResponse: ErrorResponse = formatError('RESOURCE_CREATION_FAILED', 'Failed to create the resource.');
        return NextResponse.json(errorResponse, { status: 500 });
      }
    } else if (action === 'update') {
      const updatedData = await request.json();
      result = await updateResource(resourceName, resourceId, updatedData);
      if (!result) {
        const errorResponse: ErrorResponse = formatError('RESOURCE_UPDATE_FAILED', 'Failed to update the resource.');
        return NextResponse.json(errorResponse, { status: 404 });
      }
    } else if (action === 'delete') {
      const deleteSuccess = await deleteResource(resourceName, resourceId);
      if (!deleteSuccess) {
        const errorResponse: ErrorResponse = formatError('RESOURCE_DELETION_FAILED', 'Failed to delete the resource.');
        return NextResponse.json(errorResponse, { status: 404 });
      }
      result = { message: 'Resource deleted successfully.' };
    }

    // Increment feature count if credits were deducted
    if (shouldDeductCredits) {
      await incrementFeatureCount(userId, actionFeatureKey, subscription.subscriptionId);
    }

    // Log user action
    await logUserAction({
      subjectId: userId,
      orgId,
      action,
      actionFeatureKey,
      resourceId,
      creditsUsed: shouldDeductCredits ? creditsDeducted.creditsDeducted : 0,
      createdAt: new Date(),
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error(`Error handling ${action} for ${params.resourceName}/${params.resourceId}:`, error);
    handleApiError(error);
    const errorResponse: ErrorResponse = formatError('INTERNAL_SERVER_ERROR', 'An unexpected error occurred.');
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
