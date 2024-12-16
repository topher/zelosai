import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ModelInferenceResource = {
  resourceTypeId: ResourceType.ModelInference,
  defaultPredicates: {
  "name": "required",
  "description": "required",
  "creator": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "name": "required",
  "description": "required",
  "creator": "required"
},ResourceType.ModelInference),
  agentId: 'leadModelGenerationAgent', // Assign an agentId to the resource
};

export default ModelInferenceResource;
