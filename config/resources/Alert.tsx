import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const AlertResource = {
  resourceTypeId: ResourceType.Alert,
  schema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        message: Yup.string().required('Message is required'),
        severity: Yup.string().required('Severity is required'),
        date: Yup.string().required('Date is required'),
        tags: Yup.array().of(Yup.string()).required('Tags are required'),
        relatedGoals: Yup.array().of(Yup.string()),
    }),
  fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'message', label: 'Message', type: 'textarea', required: true },
        { name: 'severity', label: 'Severity', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'text', required: true },
        { name: 'tags', label: 'Tags', type: 'autocomplete', required: true },
        { name: 'relatedGoals', label: 'Related Goals', type: 'autocomplete' },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyAlertsAgent', // Assign an agentId to the resource
};

export default AlertResource;
