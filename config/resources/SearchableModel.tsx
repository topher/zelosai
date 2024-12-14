import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const SearchableModelResource = {
  resourceTypeId: ResourceType.SearchableModel,
  schema: Yup.object().shape({
        // Define the schema for searchable feature
    }),
  fields: [
        // Define fields for searchable feature
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeySearchableModelsAgent', // Assign an agentId to the resource
};

export default SearchableModelResource;
