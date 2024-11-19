import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const recommendationsFeature: Feature = {
    key: FeatureKey.Recommendations,
    schema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        recommendedResourceId: Yup.string(),
        recommendedResourceType: Yup.string().required('Recommended Resource Type is required'),
        action: Yup.string().required('Action is required'),
        reason: Yup.string(),
        recommenderId: Yup.string().required('Recommender ID is required'),
    }),
    fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'recommendedResourceId', label: 'Recommended Resource ID', type: 'text' },
        { name: 'recommendedResourceType', label: 'Recommended Resource Type', type: 'text', required: true },
        { name: 'action', label: 'Action', type: 'text', required: true },
        { name: 'reason', label: 'Reason', type: 'textarea' },
        { name: 'recommenderId', label: 'Recommender ID', type: 'text', required: true },
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadRecommendation,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [5, 25, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateRecommendation,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [2, 10, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateRecommendation,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [2, 10, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteRecommendation,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 5, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Dashboard,
        icon: Target,
        label: 'Recommendations',
        href: '/dashboard/recommendations',
        description: 'View recommendations.',
        isInProd: false,
        resourceName: 'recommendations',
        resourceType: ResourceType.Recommendation,
    },
};
