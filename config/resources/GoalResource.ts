import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const GoalResource = {
  resourceTypeId: ResourceType.Goal,
  defaultPredicates: {
  "goal": "required",
  "description": "required",
  "strategic_indicator": "required",
  "kpi": "required",
  "developer": "required",
  "related_issues": "required",
  "is_active": "allowed",
  "related_strategic_issues": "allowed",
  "related_model_trainings": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "goal": "required",
  "description": "required",
  "strategic_indicator": "required",
  "kpi": "required",
  "developer": "required",
  "related_issues": "required",
  "is_active": "allowed",
  "related_strategic_issues": "allowed",
  "related_model_trainings": "allowed"
}, ResourceType.Goal),
  agentId: 'leadGoalsAgent', // Assign an agentId to the resource
};

export default GoalResource;
