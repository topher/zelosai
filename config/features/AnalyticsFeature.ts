import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { BarChart } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const analyticsFeature: Feature = {
    key: FeatureKey.Analytics,
    schema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        value: Yup.number().required('Value is required'),
        description: Yup.string().required('Description is required'),
        date: Yup.string().required('Date is required'),
        tags: Yup.array().of(Yup.string()).required('Tags are required'),
        relatedGoals: Yup.array().of(Yup.string()),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadStatistic,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 50, 200],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateStatistic,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateStatistic,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteStatistic,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 10, 50],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Dashboard,
        icon: BarChart,
        label: 'Analytics',
        href: '/dashboard/analytics',
        description: 'View analytics statistics.',
        isInProd: true,
        resourceName: 'statistics',
        resourceType: ResourceType.Statistic,
        agentId: 'leadAnalyticsAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "title": "required",
              "value": "required",
              "description": "required",
              "date": "required",
              "tags": "required",
              "related_goals": "allowed"
            }
    },
};