import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const TopicResource = {
  resourceTypeId: ResourceType.Topic,
  defaultPredicates: {
  "category": "required",
  "description": "required",
  "preferences": "required",
  "influencer_name": "required",
  "brand": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "category": "required",
  "description": "required",
  "preferences": "required",
  "influencer_name": "required",
  "brand": "required"
},ResourceType.Topic),
  agentId: 'leadTopicsAgent', // Assign an agentId to the resource
};

export default TopicResource;
