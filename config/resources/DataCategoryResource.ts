import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const DataCategoryResource = {
  resourceTypeId: ResourceType.DataCategory,
  defaultPredicates: {
  "data_category": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "data_category": "required"
},ResourceType.DataCategory),
  agentId: 'leadTermsAgent', // Assign an agentId to the resource
};

export default DataCategoryResource;
