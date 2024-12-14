import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const SearchableAthleteResource = {
  resourceTypeId: ResourceType.SearchableAthlete,
  schema: Yup.object().shape({
        // Define the schema for athlete profiles
    }),
  fields: [
        // Define fields for athlete profiles
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeySearchableAthletesAgent', // Assign an agentId to the resource
};

export default SearchableAthleteResource;
