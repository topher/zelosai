import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const AIModelResource = {
  resourceTypeId: ResourceType.AIModel,
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
  fields: [
        { name: 'modelName', label: 'Model Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'trainingDataSources', label: 'Training Data Sources', type: 'autocomplete', multiple: true, required: true },
        { name: 'trainingStatus', label: 'Training Status', type: 'text', required: true },
        { name: 'accuracy', label: 'Accuracy', type: 'number', required: true },
        { name: 'lastTrainedAt', label: 'Last Trained At', type: 'text', required: true },
        { name: 'relatedModels', label: 'Related Models', type: 'autocomplete', multiple: true },
        {
            name: 'parameters',
            label: 'Parameters',
            type: 'object',
            fields: [
                { name: 'epochs', label: 'Epochs', type: 'number', required: true },
                { name: 'learningRate', label: 'Learning Rate', type: 'number', required: true },
                { name: 'batchSize', label: 'Batch Size', type: 'number', required: true },
                { name: 'optimizer', label: 'Optimizer', type: 'text', required: true },
                { name: 'layers', label: 'Layers', type: 'text', required: true },
            ],
        },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyModelsAgent', // Assign an agentId to the resource
};

export default AIModelResource;
