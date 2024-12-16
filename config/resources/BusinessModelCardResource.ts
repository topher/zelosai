import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const BusinessModelCardResource = {
  resourceTypeId: ResourceType.BusinessModelCard,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadBusinessModelAgent', // Assign an agentId to the resource
};

export default BusinessModelCardResource;
