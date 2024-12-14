import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const TaskResource = {
  resourceTypeId: ResourceType.Task,
  defaultPredicates: {
  "title": "required",
  "description": "allowed",
  "status": "required",
  "priority": "required",
  "stage_id": "required",
  "related_workflows": "allowed",
  "related_agents": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "title": "required",
  "description": "allowed",
  "status": "required",
  "priority": "required",
  "stage_id": "required",
  "related_workflows": "allowed",
  "related_agents": "allowed"
},ResourceType.Task),
  agentId: 'leadTasksAgent', // Assign an agentId to the resource
};

export default TaskResource;
