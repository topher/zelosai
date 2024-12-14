import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const SearchableBrandResource = {
  resourceTypeId: ResourceType.SearchableBrand,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadSearchableBrandsAgent', // Assign an agentId to the resource
};

export default SearchableBrandResource;
