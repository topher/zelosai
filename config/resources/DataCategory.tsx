import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const DataCategoryResource = {
  resourceTypeId: ResourceType.DataCategory,
  schema: Yup.object().shape({
        data_category: Yup.string().required('Data Category is required'),
    }),
  fields: [
        { name: 'data_category', label: 'Data Category', type: 'text', required: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyTermsAgent', // Assign an agentId to the resource
};

export default DataCategoryResource;
