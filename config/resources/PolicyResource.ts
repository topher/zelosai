import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const PolicyResource = {
  resourceTypeId: ResourceType.Policy,
  defaultPredicates: {
  "policy": "required",
  "description": "required",
  "category": "required",
  "is_active": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "policy": "required",
  "description": "required",
  "category": "required",
  "is_active": "allowed"
},ResourceType.Policy),
  agentId: 'leadPoliciesAgent', // Assign an agentId to the resource
};

export default PolicyResource;
