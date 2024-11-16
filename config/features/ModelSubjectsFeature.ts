import * as Yup from 'yup';
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
    fields: [
        { name: 'subjectName', label: 'Subject Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'expertiseLevel', label: 'Expertise Level', type: 'text', required: true },
        { name: 'relatedModels', label: 'Related Models', type: 'autocomplete', resourceTypes: ['AI Models'], multiple: true, required: true },
        { name: 'relatedTrainingIds', label: 'Related Training IDs', type: 'autocomplete', resourceTypes: ['Model Training'], multiple: true },
        { name: 'associatedPersonas', label: 'Associated Personas', type: 'autocomplete', resourceTypes: ['Personas'], multiple: true },
        { name: 'linkedInfoAssets', label: 'Linked Info Assets', type: 'autocomplete', resourceTypes: ['Info Assets'], multiple: true },
    ],
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
        resourceType: 'ModelSubject',
    },
};
