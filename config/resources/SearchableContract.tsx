import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const SearchableContractResource = {
  resourceTypeId: ResourceType.SearchableContract,
  schema: Yup.object().shape({
        // Define the schema for searchable contracts feature
    }),
  fields: [
        // Define fields for searchable contracts feature
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeySearchableContractsAgent', // Assign an agentId to the resource
};

export default SearchableContractResource;
