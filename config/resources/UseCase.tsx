import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const UseCaseResource = {
  resourceTypeId: ResourceType.UseCase,
  schema: Yup.object().shape({
        Description: Yup.string().required('Description is required'),
        Subject: Yup.string().required('Subject is required'),
        Target: Yup.string().required('Target is required'),
        ForPurpose: Yup.array().of(Yup.string()).required('For Purpose is required'),
        Models: Yup.number().required('Models is required'),
    }),
  fields: [
        { name: 'Description', label: 'Description', type: 'textarea', required: true },
        { name: 'Subject', label: 'Subject', type: 'text', required: true },
        { name: 'Target', label: 'Target', type: 'text', required: true },
        { name: 'ForPurpose', label: 'For Purpose', type: 'autocomplete', multiple: true, required: true },
        { name: 'Models', label: 'Models', type: 'number', required: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyUseCasesAgent', // Assign an agentId to the resource
};

export default UseCaseResource;
