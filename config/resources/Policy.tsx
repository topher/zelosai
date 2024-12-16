import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const PolicyResource = {
  resourceTypeId: ResourceType.Policy,
  schema: Yup.object().shape({
        Policy: Yup.string().required('Policy is required'),
        Description: Yup.string().required('Description is required'),
        Category: Yup.string().required('Category is required'),
        isActive: Yup.boolean().default(true),
    }),
  fields: [
        { name: 'Policy', label: 'Policy', type: 'text', required: true },
        { name: 'Description', label: 'Description', type: 'textarea', required: true },
        { name: 'Category', label: 'Category', type: 'text', required: true },
        { name: 'isActive', label: 'Is Active', type: 'checkbox' },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyPoliciesAgent', // Assign an agentId to the resource
};

export default PolicyResource;
