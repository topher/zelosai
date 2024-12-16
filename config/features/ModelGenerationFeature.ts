import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const modelGenerationFeature: Feature = {
    key: FeatureKey.ModelGeneration,
    schema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        creator: Yup.string().required('Creator is required'),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadModelGeneration,
            action: 'read',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 10, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateModelGeneration,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.ReadModelGeneration,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.CreateModelGeneration,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 2, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Models,
        icon: Target,
        label: 'Model Generation',
        href: '/models/*/[id]',
        description: 'Manage the Content you generate using AI.',
        isInProd: false,
        resourceName: 'model_inferences',
        resourceType: ResourceType.ModelInference,
        maxResourceCount: [0, 10, 100],
        agentId: 'leadModelGenerationAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "name": "required",
              "description": "required",
              "creator": "required"
            }
    },
};
