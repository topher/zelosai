import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const StatisticResource = {
  resourceTypeId: ResourceType.Statistic,
  schema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        value: Yup.number().required('Value is required'),
        description: Yup.string().required('Description is required'),
        date: Yup.string().required('Date is required'),
        tags: Yup.array().of(Yup.string()).required('Tags are required'),
        relatedGoals: Yup.array().of(Yup.string()),
    }),
  fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'value', label: 'Value', type: 'number', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'date', label: 'Date', type: 'text', required: true },
        { name: 'tags', label: 'Tags', type: 'autocomplete', resourceTypes: ['tags'], multiple: true, required: true },
        { name: 'relatedGoals', label: 'Related Goals', type: 'autocomplete', resourceTypes: ['goals'], multiple: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyAnalyticsAgent', // Assign an agentId to the resource
};

export default StatisticResource;
