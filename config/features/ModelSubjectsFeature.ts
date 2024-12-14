import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const modelSubjectsFeature: Feature = {
    key: FeatureKey.ModelSubjects,
    schema: Yup.object().shape({
        subjectName: Yup.string().required('Subject Name is required'),
        description: Yup.string().required('Description is required'),
        expertiseLevel: Yup.string().required('Expertise Level is required'),
        relatedModels: Yup.array().of(Yup.string()).required('Related Models are required'),
        relatedTrainingIds: Yup.array().of(Yup.string()),
        associatedPersonas: Yup.array().of(Yup.string()),
        linkedInfoAssets: Yup.array().of(Yup.string()),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadModelSubject,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 50, 200],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateModelSubject,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateModelSubject,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteModelSubject,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 10, 50],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Models,
        icon: Target,
        label: 'Model Subjects',
        href: '/models/model-subjects',
        description: 'Define model subjects.',
        isInProd: true,
        resourceName: 'model_subjects',
        resourceType: ResourceType.ModelSubject,
        agentId: 'leadModelSubjectsAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "subject_name": "required",
              "description": "required",
              "expertise_level": "required",
              "related_models": "required",
              "related_training_ids": "allowed",
              "associated_personas": "allowed",
              "linked_info_assets": "allowed"
            }
    },
};
