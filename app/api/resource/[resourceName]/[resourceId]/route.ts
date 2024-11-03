// app/api/resource/[resourceName]/[resourceId]/route.ts

import { NextResponse } from 'next/server';
import { getUserAttributes } from '@/lib/auth';
import { checkFeatureLimit } from '@/lib/limits';
import { deductCredits } from '@/lib/credits';
import { logUserAction } from '@/lib/logging';
import { getResourceById, createResource, updateResource, deleteResource } from '@/lib/dataFetching';
import { incrementFeatureCount } from '@/lib/user';
import { evaluateAccess } from '@/lib/policyEvaluation';
import { Action, FeatureKey } from '@/config/featuresConfig';
export async function GET(request: Request, { params }: { params: { resourceName: string; resourceId: string } }) {
  return handleResourceAction('read', request, params);
}

export async function POST(request: Request, { params }: { params: { resourceName: string; resourceId: string } }) {
  return handleResourceAction('create', request, params);
}

export async function DELETE(request: Request, { params }: { params: { resourceName: string; resourceId: string } }) {
  return handleResourceAction('delete', request, params);
}

// Adding PUT for the update/edit action
export async function PUT(request: Request, { params }: { params: { resourceName: string; resourceId: string } }) {
  return handleResourceAction('edit', request, params);
}

async function handleResourceAction(
  action: Action,
  request: Request,
  params: { resourceName: string; resourceId: string }
) {
  try {
    const { resourceName, resourceId } = params;

    // Fetch user attributes
    const userAttributes = await getUserAttributes(request);
    const { userId, orgId, orgSubscriptionId, subscription } = userAttributes;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check access based on policies
    const accessGranted = await evaluateAccess({
      userId,
      action,
      resourceId,
      resourceType: resourceName,
      userAttributes,
      subscription,
    });

    if (!accessGranted) {
      return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
    }

    // Map action and resourceType to FeatureKey
    const featureKey = getFeatureKeyFromResourceName(resourceName);
    if (!featureKey) {
      console.error(`No FeatureKey mapping found for resourceType: ${resourceName}`);
      return NextResponse.json({ error: 'Invalid Feature' }, { status: 400 });
    }

    // Check feature limit and deduct credits
    const canProceed = await checkFeatureLimit({ userId, feature: featureKey });
    if (!canProceed) {
      return NextResponse.json({ error: 'Feature limit reached' }, { status: 403 });
    }

    const deductParams = {
      userId,
      orgId,
      action,
      resourceType: resourceName,
      feature: featureKey,
      subscriptionId: subscription.subscriptionId,
    };

    const creditsDeducted = await deductCredits(deductParams);

    if (creditsDeducted === false) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
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
    await incrementFeatureCount(userId, featureKey);

    // Log user action
    await logUserAction({
      subjectId: userId,
      orgId,
      action,
      feature: featureKey,
      resourceId,
      creditsUsed: creditsDeducted,
      createdAt: new Date(),
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error(`Error handling ${action} for ${params.resourceName}/${params.resourceId}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * Helper function to map resourceName to FeatureKey
 * You need to define this based on your feature configuration
 */
function getFeatureKeyFromResourceName(resourceName: string): FeatureKey | null {
  const resourceToFeatureMap: { [key: string]: FeatureKey } = {
    goals: FeatureKey.Goals,
    use_cases: FeatureKey.UseCases,
    agents: FeatureKey.Agents,
    issues: FeatureKey.Issues,
    business_model: FeatureKey.BusinessModel,
    branding: FeatureKey.Branding,
    models: FeatureKey.Models,
    custom_models: FeatureKey.CustomModels,
    train_models: FeatureKey.TrainModels,
    connectors: FeatureKey.Connectors,
    topics: FeatureKey.Topics,
    info_assets: FeatureKey.InfoAssets,
    policies: FeatureKey.Policies,
    terms: FeatureKey.Terms,
    messages: FeatureKey.Messages,
    offers: FeatureKey.Offers,
    contracts: FeatureKey.Contracts,
    transactions: FeatureKey.Transactions,
    workflows: FeatureKey.Workflows,
    tasks: FeatureKey.Tasks,
    calendar: FeatureKey.Calendar,
    profile_athletes: FeatureKey.ProfileAthletes,
    profile_contracts: FeatureKey.ProfileContracts,
    profile_models: FeatureKey.ProfileModels,
    profile_brands: FeatureKey.ProfileBrands,
    profile_users: FeatureKey.ProfileUsers,
    searchable_athletes: FeatureKey.SearchableAthletes,
    searchable_contracts: FeatureKey.SearchableContracts,
    searchable_models: FeatureKey.SearchableModels,
    searchable_brands: FeatureKey.SearchableBrands,
    searchable_users: FeatureKey.SearchableUsers,
    brand_model_cards: FeatureKey.Branding,
    // Add more mappings as needed
  };

  return resourceToFeatureMap[resourceName.toLowerCase()] || null;
}
