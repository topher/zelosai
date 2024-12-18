import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const StrategicIssueResource = {
  resourceTypeId: ResourceType.StrategicIssue,
  defaultPredicates: {
  "topic": "required",
  "swot _type": "required",
  "subscribed": "allowed",
  "related_goals": "allowed",
  "related_use_cases": "allowed",
  "related_topics": "allowed",
  "associated_goals": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "topic": "required",
  "swot _type": "required",
  "subscribed": "allowed",
  "related_goals": "allowed",
  "related_use_cases": "allowed",
  "related_topics": "allowed",
  "associated_goals": "allowed"
},ResourceType.StrategicIssue),
  agentId: 'leadIssuesAgent', // Assign an agentId to the resource
};

export default StrategicIssueResource;
