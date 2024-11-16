import * as Yup from 'yup';
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
    fields: [
        { name: 'modelName', label: 'Model Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'trainingDataSources', label: 'Training Data Sources', type: 'autocomplete', resourceTypes: ['data_sources'], multiple: true, required: true },
        { name: 'trainingStatus', label: 'Training Status', type: 'text', required: true },
        { name: 'accuracy', label: 'Accuracy', type: 'number', required: true },
        { name: 'lastTrainedAt', label: 'Last Trained At', type: 'text', required: true },
        { name: 'parameters.epochs', label: 'Epochs', type: 'number', required: true },
        { name: 'parameters.learningRate', label: 'Learning Rate', type: 'number', required: true },
        { name: 'parameters.batchSize', label: 'Batch Size', type: 'number', required: true },
        { name: 'parameters.optimizer', label: 'Optimizer', type: 'text', required: true },
        { name: 'parameters.layers', label: 'Layers', type: 'text', required: true },
    ],
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
        resourceType: 'ModelTraining',
    },
};
