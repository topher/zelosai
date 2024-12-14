import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const SearchableUserResource = {
  resourceTypeId: ResourceType.SearchableUser,
  schema: Yup.object().shape({
        // Define the schema for searchable brands feature
    }),
  fields: [
        // Define fields for searchable brands feature
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeySearchableUsersAgent', // Assign an agentId to the resource
};

export default SearchableUserResource;
