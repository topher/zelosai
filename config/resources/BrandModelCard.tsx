import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const BrandModelCardResource = {
  resourceTypeId: ResourceType.BrandModelCard,
  schema: Yup.object().shape({
        // Define the schema for Branding feature fields
    }),
  fields: [
        // Define the field configurations for Branding feature
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyBrandingAgent', // Assign an agentId to the resource
};

export default BrandModelCardResource;
