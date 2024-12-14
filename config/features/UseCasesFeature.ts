import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const useCasesFeature: Feature = {
    key: FeatureKey.UseCases,
    schema: Yup.object().shape({
        Description: Yup.string().required('Description is required'),
        Subject: Yup.string().required('Subject is required'),
        Target: Yup.string().required('Target is required'),
        ForPurpose: Yup.array().of(Yup.string()).required('For Purpose is required'),
        Models: Yup.number().required('Models is required'),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadUseCase,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [0, 5, 15],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateUseCase,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateUseCase,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteUseCase,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 1, 5],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Models,
        icon: Target,
        label: 'Safety',
        href: '/models/use-cases',
        description: 'Set the practical applications for your AI models and products.',
        isInProd: true,
        resourceName: 'use_cases',
        resourceType: ResourceType.UseCase,
        maxResourceCount: [0, 5, 15],
        agentId: 'leadUseCasesAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "description": "required",
              "subject": "required",
              "target": "required",
              "for_purpose": "required",
              "models": "required"
            }
    },
};
