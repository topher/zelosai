import * as Yup from 'yup';
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const topicsFeature: Feature = {
    key: FeatureKey.Topics,
    schema: Yup.object().shape({
        category: Yup.string().required('Category is required'),
        description: Yup.string().required('Description is required'),
        preferences: Yup.array().of(Yup.string()).required('Preferences are required'),
        influencerName: Yup.string().required('Influencer Name is required'),
        brand: Yup.string().required('Brand is required'),
    }),
    fields: [
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'preferences', label: 'Preferences', type: 'autocomplete', required: true },
        { name: 'influencerName', label: 'Influencer Name', type: 'text', required: true },
        { name: 'brand', label: 'Brand', type: 'text', required: true },
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadTopic,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [0, 10, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateTopic,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateTopic,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteTopic,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 2, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.KnowledgeBank,
        icon: Target,
        label: 'Topics',
        href: '/assets/topics',
        description: 'Organize your topics.',
        isInProd: true,
        resourceName: 'topics',
        resourceType: 'Topic',
        maxResourceCount: [0, 10, 100],
    },
};
