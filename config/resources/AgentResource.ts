import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const AgentResource = {
  resourceTypeId: ResourceType.Agent,
  defaultPredicates: {
  "agent_type": "required",
  "name": "required",
  "expertise_areas": "required",
  "availability_status": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "agent_type": "required",
  "name": "required",
  "expertise_areas": "required",
  "availability_status": "required"
},ResourceType.Agent),
  agentId: 'leadAgentsAgent', // Assign an agentId to the resource
};

export default AgentResource;
