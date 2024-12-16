import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
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
        resourceType: ResourceType.StrategicIssue,
        maxResourceCount: [0, 5, 15],
        agentId: 'leadIssuesAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "topic": "required",
              "swot _type": "required",
              "subscribed": "allowed",
              "related_goals": "allowed",
              "related_use_cases": "allowed",
              "related_topics": "allowed",
              "associated_goals": "allowed"
            }
    },
};
