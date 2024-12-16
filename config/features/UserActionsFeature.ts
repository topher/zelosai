import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const userActionsFeature: Feature = {
    key: FeatureKey.UserActions,
    schema: Yup.object().shape({
        // Define the schema for User Actions feature
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadUserAction,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [2, 5, 15],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateUserAction,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateUserAction,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteUserAction,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 1, 5],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Dashboard,
        icon: Target,
        label: 'User Actions',
        href: '/settings/usage',
        description: 'View Past Activity.',
        isInProd: false,
        resourceName: 'user_actions',
        resourceType: ResourceType.UserAction,
        agentId: 'leadUserActionsAgent',
        requiredPredicates: [],
        defaultPredicates: {}
    },
};
