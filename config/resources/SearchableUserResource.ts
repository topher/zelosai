import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const SearchableUserResource = {
  resourceTypeId: ResourceType.SearchableUser,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadSearchableUsersAgent', // Assign an agentId to the resource
};

export default SearchableUserResource;
