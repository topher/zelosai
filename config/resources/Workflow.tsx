import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const WorkflowResource = {
  resourceTypeId: ResourceType.Workflow,
  schema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        creator: Yup.string().required('Creator is required'),
        stages: Yup.array().of(Yup.object().shape({
            id: Yup.string().required('Stage ID is required'),
            name: Yup.string().required('Stage Name is required'),
            params: Yup.object(),
        })).required('Stages are required'),
    }),
  fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'creator', label: 'Creator', type: 'text', required: true },
        {
            name: 'stages',
            label: 'Stages',
            type: 'autocomplete',
            resourceTypes: ['workflowStages'],
            multiple: true,
            required: true,
        },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyWorkflowsAgent', // Assign an agentId to the resource
};

export default WorkflowResource;
