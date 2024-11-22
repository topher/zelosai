import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const goalsFeature: Feature = {
    key: FeatureKey.Goals,
    schema: Yup.object().shape({
        Goal: Yup.string().required('Goal is required'),
        Description: Yup.string().required('Description is required'),
        StrategicIndicator: Yup.string().required('Strategic Indicator is required'),
        KPI: Yup.string().required('KPI is required'),
        Developer: Yup.string().required('Developer is required'),
        RelatedIssues: Yup.array().of(Yup.string()).required('Related Issues are required'),
        isActive: Yup.boolean().default(true),
        relatedStrategicIssues: Yup.array().of(Yup.string()),
        relatedModelTrainings: Yup.array().of(Yup.string()),
    }),
    fields: [
        { name: 'Goal', label: 'Goal', type: 'text', required: true },
        { name: 'Description', label: 'Description', type: 'textarea', required: true },
        { name: 'StrategicIndicator', label: 'Strategic Indicator', type: 'text', required: true },
        { name: 'KPI', label: 'KPI', type: 'text', required: true },
        { name: 'Developer', label: 'Developer', type: 'text', required: true },
        {
            name: 'RelatedIssues',
            label: 'Related Issues',
            type: 'autocomplete',
            resourceTypes: ['issues'],
            multiple: true,
            required: true,
        },
        {
            name: 'isActive',
            label: 'Is Active',
            type: 'checkbox',
        },
        {
            name: 'relatedStrategicIssues',
            label: 'Related Strategic Issues',
            type: 'autocomplete',
            resourceTypes: ['strategic_issues'],
            multiple: true,
        },
        {
            name: 'relatedModelTrainings',
            label: 'Related Model Trainings',
            type: 'autocomplete',
            resourceTypes: ['model_trainings'],
            multiple: true,
        },
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadGoal,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [2, 5, 15],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateGoal,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateGoal,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteGoal,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 1, 5],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Strategy,
        icon: Target,
        label: 'Goals',
        href: '/strategy/goals',
        description: 'Define the objectives for your organization.',
        isInProd: true,
        resourceName: 'goals',
        resourceType: ResourceType.Goal,
        maxResourceCount: [2, 5, 15],
    },
};