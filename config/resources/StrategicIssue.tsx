import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const StrategicIssueResource = {
  resourceTypeId: ResourceType.StrategicIssue,
  schema: Yup.object().shape({
        Topic: Yup.string().required('Topic is required'),
        "SWOT Type": Yup.string().required('SWOT Type is required'),
        Subscribed: Yup.boolean().default(false),
        RelatedGoals: Yup.array().of(Yup.string()),
        RelatedUseCases: Yup.array().of(Yup.string()),
        relatedTopics: Yup.array().of(Yup.string()),
        associatedGoals: Yup.array().of(Yup.string()),
    }),
  fields: [
        { name: 'Topic', label: 'Topic', type: 'text', required: true },
        { name: 'SWOT Type', label: 'SWOT Type', type: 'text', required: true },
        { name: 'Subscribed', label: 'Subscribed', type: 'checkbox' },
        { name: 'RelatedGoals', label: 'Related Goals', type: 'autocomplete', resourceTypes: ['goals'], multiple: true },
        { name: 'RelatedUseCases', label: 'Related Use Cases', type: 'autocomplete', resourceTypes: ['use_cases'], multiple: true },
        { name: 'relatedTopics', label: 'Related Topics', type: 'autocomplete', resourceTypes: ['topics'], multiple: true },
        { name: 'associatedGoals', label: 'Associated Goals', type: 'autocomplete', resourceTypes: ['goals'], multiple: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyIssuesAgent', // Assign an agentId to the resource
};

export default StrategicIssueResource;
