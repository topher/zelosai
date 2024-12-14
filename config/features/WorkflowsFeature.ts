import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const workflowsFeature: Feature = {
    key: FeatureKey.Workflows,
    schema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        creator: Yup.string().required('Creator is required'),
        stages: Yup.array().of(Yup.object().shape({
            id: Yup.string().required('Stage ID is required'),
            name: Yup.string().required('Stage Name is required'),
            params: Yup.object(),
        })).required('Stages are required'),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadWorkflow,
            action: 'read',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 10, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateWorkflow,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateWorkflow,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteWorkflow,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 2, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Workflows,
        icon: Target,
        label: 'Library',
        href: '/workflows/library',
        description: 'Manage your workflows.',
        isInProd: false,
        resourceName: 'workflows',
        resourceType: ResourceType.Workflow,
        maxResourceCount: [0, 10, 100],
        agentId: 'leadWorkflowsAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "name": "required",
              "description": "required",
              "creator": "required",
              "stages": "required"
            }
    },
};
