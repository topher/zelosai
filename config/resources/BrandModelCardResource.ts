import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const BrandModelCardResource = {
  resourceTypeId: ResourceType.BrandModelCard,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadBrandingAgent', // Assign an agentId to the resource
};

export default BrandModelCardResource;
