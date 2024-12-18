import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const SearchableBrandResource = {
  resourceTypeId: ResourceType.SearchableBrand,
  schema: Yup.object().shape({
        // Define the schema for searchable brands feature
    }),
  fields: [
        // Define fields for searchable brands feature
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeySearchableBrandsAgent', // Assign an agentId to the resource
};

export default SearchableBrandResource;
