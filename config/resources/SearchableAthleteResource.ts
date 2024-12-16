import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const SearchableAthleteResource = {
  resourceTypeId: ResourceType.SearchableAthlete,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadSearchableAthletesAgent', // Assign an agentId to the resource
};

export default SearchableAthleteResource;
