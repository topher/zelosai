import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const TripleResource = {
  resourceTypeId: ResourceType.Triple,
  defaultPredicates: {
  "subject": "required",
  "predicate": "required",
  "object": "required",
  "citation": "allowed",
  "visibility": "required",
  "profile_id": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "subject": "required",
  "predicate": "required",
  "object": "required",
  "citation": "allowed",
  "visibility": "required",
  "profile_id": "required"
},ResourceType.Triple),
  agentId: 'leadTriplesAgent', // Assign an agentId to the resource
};

export default TripleResource;
