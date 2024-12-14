import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const termsFeature: Feature = {
    key: FeatureKey.Terms,
    schema: Yup.object().shape({
        data_category: Yup.string().required('Data Category is required'),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadTerm,
            action: 'read',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 10, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateTerm,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateTerm,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteTerm,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 2, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.KnowledgeBank,
        icon: Target,
        label: 'Terms',
        href: '/assets/terms',
        description: 'Manage terms and conditions.',
        isInProd: true,
        resourceName: 'data_category',
        resourceType: ResourceType.DataCategory,
        maxResourceCount: [0, 10, 100],
        agentId: 'leadTermsAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "data_category": "required"
            }
    },
};
