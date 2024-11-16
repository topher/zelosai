import * as Yup from 'yup';
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const issuesFeature: Feature = {
    key: FeatureKey.Issues,
    schema: Yup.object().shape({
        Topic: Yup.string().required('Topic is required'),
        "SWOT Type": Yup.string().required('SWOT Type is required'),
        Subscribed: Yup.boolean().default(false),
        RelatedGoals: Yup.array().of(Yup.string()),
        RelatedUseCases: Yup.array().of(Yup.string()),
        relatedTopics: Yup.array().of(Yup.string()),
        associatedGoals: Yup.array().of(Yup.string()),
    }),
    fields: [
        { name: 'Topic', label: 'Topic', type: 'text', required: true },
        { name: 'SWOT Type', label: 'SWOT Type', type: 'text', required: true },
        { name: 'Subscribed', label: 'Subscribed', type: 'checkbox' },
        { name: 'RelatedGoals', label: 'Related Goals', type: 'autocomplete', resourceTypes: ['goals'], multiple: true },
        { name: 'RelatedUseCases', label: 'Related Use Cases', type: 'autocomplete', resourceTypes: ['use_cases'], multiple: true },
        { name: 'relatedTopics', label: 'Related Topics', type: 'autocomplete', resourceTypes: ['topics'], multiple: true },
        { name: 'associatedGoals', label: 'Associated Goals', type: 'autocomplete', resourceTypes: ['goals'], multiple: true },
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadIssue,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [0, 5, 15],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateIssue,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateIssue,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteIssue,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 1, 5],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Strategy,
        icon: Target,
        label: 'Strategic Issues',
        href: '/strategy/issues',
        description: 'Manage strategic issues.',
        isInProd: true,
        resourceName: 'issues',
        resourceType: 'StrategicIssue',
        maxResourceCount: [0, 5, 15],
    },
};
