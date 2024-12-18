import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Brain } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const modelsFeature: Feature = {
    key: FeatureKey.Models,
    schema: Yup.object().shape({
        modelName: Yup.string().required('Model Name is required'),
        description: Yup.string().required('Description is required'),
        trainingDataSources: Yup.array().of(Yup.string()).required('Training Data Sources are required'),
        trainingStatus: Yup.string().required('Training Status is required'),
        accuracy: Yup.number().required('Accuracy is required'),
        lastTrainedAt: Yup.string().required('Last Trained At is required'),
        relatedModels: Yup.array().of(Yup.string()),
        parameters: Yup.object().shape({
            epochs: Yup.number().required('Epochs is required'),
            learningRate: Yup.number().required('Learning Rate is required'),
            batchSize: Yup.number().required('Batch Size is required'),
            optimizer: Yup.string().required('Optimizer is required'),
            layers: Yup.array().of(Yup.number()).required('Layers are required'),
        }),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadModel,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 100, 1000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateModel,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateModel,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteModel,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 20, 200],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Models,
        icon: Brain        ,
        label: 'Models',
        href: '/models/library',
        description: 'Explore your AI models.',
        isInProd: true,
        resourceName: 'complete_trained_models',
        resourceType: ResourceType.AIModel,
        maxResourceCount: [10, 100, 1000],
        agentId: 'leadModelsAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "model_name": "required",
              "description": "required",
              "training_data_sources": "required",
              "training_status": "required",
              "accuracy": "required",
              "last_trained_at": "required",
              "related_models": "allowed",
              "parameters": "allowed"
            }
    },
};
