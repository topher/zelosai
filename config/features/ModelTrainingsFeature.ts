import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const modelTrainingsFeature: Feature = {
    key: FeatureKey.ModelTrainings,
    schema: Yup.object().shape({
        modelName: Yup.string().required('Model Name is required'),
        description: Yup.string().required('Description is required'),
        trainingDataSources: Yup.array().of(Yup.string()).required('Training Data Sources are required'),
        trainingStatus: Yup.string().required('Training Status is required'),
        accuracy: Yup.number().required('Accuracy is required'),
        lastTrainedAt: Yup.string().required('Last Trained At is required'),
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
            actionKey: ActionFeatureKey.ReadModelTraining,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 50, 200],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateModelTraining,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateModelTraining,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteModelTraining,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 10, 50],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Models,
        icon: Target,
        label: 'Model Trainings',
        href: '/models/model-trainings',
        description: 'Manage model training sessions.',
        isInProd: true,
        resourceName: 'model_training',
        resourceType: ResourceType.ModelTraining,
        agentId: 'leadModelTrainingsAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "model_name": "required",
              "description": "required",
              "training_data_sources": "required",
              "training_status": "required",
              "accuracy": "required",
              "last_trained_at": "required",
              "parameters.epochs": "required",
              "parameters.learning_rate": "required",
              "parameters.batch_size": "required",
              "parameters.optimizer": "required",
              "parameters.layers": "required"
            }
    },
};
