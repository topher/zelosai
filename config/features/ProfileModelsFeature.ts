import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const profileModelsFeature: Feature = {
    key: FeatureKey.ProfileModels,
    schema: Yup.object().shape({
        // Define the schema for profile models
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadProfileModel,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 100, 1000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateProfileModel,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateProfileModel,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteProfileModel,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 20, 200],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Profiles,
        icon: Target,
        label: 'Profile Models',
        href: '/profiles/models',
        description: 'Manage model profiles.',
        isInProd: true,
        resourceName: 'profile_models',
        resourceType: ResourceType.ProfileModel,
        maxResourceCount: [10, 100, 1000],
        agentId: 'leadProfileModelsAgent',
        requiredPredicates: [],
        defaultPredicates: {}
    },
};
