import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const profileUsersFeature: Feature = {
    key: FeatureKey.ProfileUsers,
    schema: Yup.object().shape({
        // Define the schema for profile users
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadProfileUser,
            action: 'read',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 100, 1000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateProfileUser,
            action: 'create',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateProfileUser,
            action: 'update',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteProfileUser,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 20, 200],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Profiles,
        icon: Target,
        label: 'Profile Users',
        href: '/profiles/users',
        description: 'Manage user profiles.',
        isInProd: false,
        resourceName: 'users_triples',
        resourceType: ResourceType.ProfileUser,
        maxResourceCount: [0, 100, 1000],
        agentId: 'leadProfileUsersAgent',
        requiredPredicates: [
              "has_name",
              "has_occupation",
              "has_family",
              "speaks_language",
              "has_award",
              "has_achievements",
              "has_description",
              "has_reason",
              "has_ambition",
              "has_influence",
              "has_interest"
            ],
        defaultPredicates: {
              "field1": "required",
              "field2": "required"
            }
    },
};
