import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const AIModelResource = {
  resourceTypeId: ResourceType.AIModel,
  defaultPredicates: {
  "model_name": "required",
  "description": "required",
  "training_data_sources": "required",
  "training_status": "required",
  "accuracy": "required",
  "last_trained_at": "required",
  "related_models": "allowed",
  "parameters": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "model_name": "required",
  "description": "required",
  "training_data_sources": "required",
  "training_status": "required",
  "accuracy": "required",
  "last_trained_at": "required",
  "related_models": "allowed",
  "parameters": "allowed"
},ResourceType.AIModel),
  agentId: 'leadModelsAgent', // Assign an agentId to the resource
};

export default AIModelResource;
