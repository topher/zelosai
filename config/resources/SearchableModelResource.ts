import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const SearchableModelResource = {
  resourceTypeId: ResourceType.SearchableModel,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadSearchableModelsAgent', // Assign an agentId to the resource
};

export default SearchableModelResource;
