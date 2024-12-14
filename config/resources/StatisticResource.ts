import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const StatisticResource = {
  resourceTypeId: ResourceType.Statistic,
  defaultPredicates: {
  "title": "required",
  "value": "required",
  "description": "required",
  "date": "required",
  "tags": "required",
  "related_goals": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "title": "required",
  "value": "required",
  "description": "required",
  "date": "required",
  "tags": "required",
  "related_goals": "allowed"
},ResourceType.Statistic),
  agentId: 'leadAnalyticsAgent', // Assign an agentId to the resource
};

export default StatisticResource;
