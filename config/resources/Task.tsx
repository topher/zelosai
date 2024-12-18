import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const TaskResource = {
  resourceTypeId: ResourceType.Task,
  schema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        status: Yup.string().required('Status is required'),
        priority: Yup.string().required('Priority is required'),
        stageId: Yup.string().required('Stage ID is required'),
        relatedWorkflows: Yup.array().of(Yup.string()),
        relatedAgents: Yup.array().of(Yup.string()),
    }),
  fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'status', label: 'Status', type: 'text', required: true },
        { name: 'priority', label: 'Priority', type: 'text', required: true },
        { name: 'stageId', label: 'Stage ID', type: 'text', required: true },
        { name: 'relatedWorkflows', label: 'Related Workflows', type: 'autocomplete', multiple: true },
        { name: 'relatedAgents', label: 'Related Agents', type: 'autocomplete', multiple: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyTasksAgent', // Assign an agentId to the resource
};

export default TaskResource;
