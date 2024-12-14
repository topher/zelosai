import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const GoalResource = {
  resourceTypeId: ResourceType.Goal,
  schema: Yup.object().shape({
        Goal: Yup.string().required('Goal is required'),
        Description: Yup.string().required('Description is required'),
        StrategicIndicator: Yup.string().required('Strategic Indicator is required'),
        KPI: Yup.string().required('KPI is required'),
        Developer: Yup.string().required('Developer is required'),
        RelatedIssues: Yup.array().of(Yup.string()).required('Related Issues are required'),
        isActive: Yup.boolean().default(true),
        relatedStrategicIssues: Yup.array().of(Yup.string()),
        relatedModelTrainings: Yup.array().of(Yup.string()),
    }),
  fields: [
        { name: 'Goal', label: 'Goal', type: 'text', required: true },
        { name: 'Description', label: 'Description', type: 'textarea', required: true },
        { name: 'StrategicIndicator', label: 'Strategic Indicator', type: 'text', required: true },
        { name: 'KPI', label: 'KPI', type: 'text', required: true },
        { name: 'Developer', label: 'Developer', type: 'text', required: true },
        {
            name: 'RelatedIssues',
            label: 'Related Issues',
            type: 'autocomplete',
            resourceTypes: ['issues'],
            multiple: true,
            required: true,
        },
        {
            name: 'isActive',
            label: 'Is Active',
            type: 'checkbox',
        },
        {
            name: 'relatedStrategicIssues',
            label: 'Related Strategic Issues',
            type: 'autocomplete',
            resourceTypes: ['strategic_issues'],
            multiple: true,
        },
        {
            name: 'relatedModelTrainings',
            label: 'Related Model Trainings',
            type: 'autocomplete',
            resourceTypes: ['model_trainings'],
            multiple: true,
        },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyGoalsAgent', // Assign an agentId to the resource
};

export default GoalResource;
