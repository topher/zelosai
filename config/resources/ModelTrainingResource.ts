import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ModelTrainingResource = {
  resourceTypeId: ResourceType.ModelTraining,
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
},
  schema: generateSchemaFromDefaultPredicates({
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
},ResourceType.ModelTraining),
  agentId: 'leadModelTrainingsAgent', // Assign an agentId to the resource
};

export default ModelTrainingResource;
