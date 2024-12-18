import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const UseCaseResource = {
  resourceTypeId: ResourceType.UseCase,
  defaultPredicates: {
  "description": "required",
  "subject": "required",
  "target": "required",
  "for_purpose": "required",
  "models": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "description": "required",
  "subject": "required",
  "target": "required",
  "for_purpose": "required",
  "models": "required"
},ResourceType.UseCase),
  agentId: 'leadUseCasesAgent', // Assign an agentId to the resource
};

export default UseCaseResource;
