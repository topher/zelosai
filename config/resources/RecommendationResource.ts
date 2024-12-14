import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const RecommendationResource = {
  resourceTypeId: ResourceType.Recommendation,
  defaultPredicates: {
  "title": "required",
  "description": "required",
  "recommended_resource_id": "allowed",
  "recommended_resource_type": "required",
  "action": "required",
  "reason": "allowed",
  "recommender_id": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "title": "required",
  "description": "required",
  "recommended_resource_id": "allowed",
  "recommended_resource_type": "required",
  "action": "required",
  "reason": "allowed",
  "recommender_id": "required"
},ResourceType.Recommendation),
  agentId: 'leadRecommendationsAgent', // Assign an agentId to the resource
};

export default RecommendationResource;
