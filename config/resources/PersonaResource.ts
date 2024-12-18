import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const PersonaResource = {
  resourceTypeId: ResourceType.Persona,
  defaultPredicates: {
  "persona_name": "required",
  "description": "required",
  "type": "required",
  "associated_use_cases": "required",
  "is_persona": "allowed",
  "image": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "persona_name": "required",
  "description": "required",
  "type": "required",
  "associated_use_cases": "required",
  "is_persona": "allowed",
  "image": "required"
},ResourceType.Persona),
  agentId: 'leadPersonasAgent', // Assign an agentId to the resource
};

export default PersonaResource;
