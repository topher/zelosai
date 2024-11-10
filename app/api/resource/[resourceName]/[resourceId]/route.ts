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
  return handleResourceAction('edit', request, params);
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get resourceType from resourceName
    const resourceType = getResourceTypeByResourceName(resourceName);
    if (!resourceType) {
      console.error(`No resourceType mapping found for resourceName: ${resourceName}`);
      return NextResponse.json({ error: 'Invalid Resource Type' }, { status: 400 });
    }

    // Get the ActionFeatureKey
    const actionFeatureKey = getActionFeatureKey(action, resourceType);
    if (!actionFeatureKey) {
      console.error(`❌ No ActionFeatureKey mapping found for action: ${action}, resourceType: ${resourceType}`);
      return NextResponse.json({ error: 'Invalid Feature' }, { status: 400 });
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
      return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
    }

    // Map resourceName to FeatureKey using utility function
    const featureKey = getFeatureKeyFromResourceName(resourceName);
    if (!featureKey) {
      console.error(`No FeatureKey mapping found for resourceName: ${resourceName}`);
      return NextResponse.json({ error: 'Invalid Feature' }, { status: 400 });
    }

    // Check feature limit and deduct credits
    const canProceed = await checkFeatureLimit({ userId, feature: actionFeatureKey }, subscription);
    if (!canProceed) {
      return NextResponse.json({ error: 'Feature limit reached' }, { status: 403 });
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
      return NextResponse.json({ error: creditsDeducted.error || 'Insufficient credits' }, { status: 403 });
    }

    // Handle the action
    let result;
    if (action === 'read') {
      result = await getResourceById(resourceName, resourceId);
      if (!result) {
        return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
      }
    } else if (action === 'create') {
      const resourceData = await request.json();
      result = await createResource(resourceName, resourceData);
    } else if (action === 'edit') {
      const updatedData = await request.json();
      result = await updateResource(resourceName, resourceId, updatedData);
      if (!result) {
        return NextResponse.json({ error: 'Resource not found or update failed' }, { status: 404 });
      }
    } else if (action === 'delete') {
      const deleteSuccess = await deleteResource(resourceName, resourceId);
      if (!deleteSuccess) {
        return NextResponse.json({ error: 'Resource not found or delete failed' }, { status: 404 });
      }
      result = { message: 'Resource deleted successfully' };
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
