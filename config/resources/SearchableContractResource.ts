import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const SearchableContractResource = {
  resourceTypeId: ResourceType.SearchableContract,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadSearchableContractsAgent', // Assign an agentId to the resource
};

export default SearchableContractResource;
