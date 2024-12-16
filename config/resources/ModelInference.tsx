import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const ModelInferenceResource = {
  resourceTypeId: ResourceType.ModelInference,
  schema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        creator: Yup.string().required('Creator is required'),
    }),
  fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'creator', label: 'Creator', type: 'text', required: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyModelGenerationAgent', // Assign an agentId to the resource
};

export default ModelInferenceResource;
