import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const policiesFeature: Feature = {
    key: FeatureKey.Policies,
    schema: Yup.object().shape({
        Policy: Yup.string().required('Policy is required'),
        Description: Yup.string().required('Description is required'),
        Category: Yup.string().required('Category is required'),
        isActive: Yup.boolean().default(true),
    }),
    fields: [
        { name: 'Policy', label: 'Policy', type: 'text', required: true },
        { name: 'Description', label: 'Description', type: 'textarea', required: true },
        { name: 'Category', label: 'Category', type: 'text', required: true },
        { name: 'isActive', label: 'Is Active', type: 'checkbox' },
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadPolicy,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [0, 10, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreatePolicy,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdatePolicy,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeletePolicy,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 2, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.KnowledgeBank,
        icon: Target,
        label: 'Policies',
        href: '/assets/policies',
        description: 'Manage organizational policies.',
        isInProd: true,
        resourceName: 'policies',
        resourceType: ResourceType.Policy,
        maxResourceCount: [0, 10, 100],
    },
};