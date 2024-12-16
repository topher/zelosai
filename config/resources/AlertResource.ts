import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const AlertResource = {
  resourceTypeId: ResourceType.Alert,
  defaultPredicates: {
  "title": "required",
  "message": "required",
  "severity": "required",
  "date": "required",
  "tags": "required",
  "related_goals": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "title": "required",
  "message": "required",
  "severity": "required",
  "date": "required",
  "tags": "required",
  "related_goals": "allowed"
},ResourceType.Alert),
  agentId: 'leadAlertsAgent', // Assign an agentId to the resource
};

export default AlertResource;
