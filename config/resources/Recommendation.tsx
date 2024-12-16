import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const RecommendationResource = {
  resourceTypeId: ResourceType.Recommendation,
  schema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        recommendedResourceId: Yup.string(),
        recommendedResourceType: Yup.string().required('Recommended Resource Type is required'),
        action: Yup.string().required('Action is required'),
        reason: Yup.string(),
        recommenderId: Yup.string().required('Recommender ID is required'),
    }),
  fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'recommendedResourceId', label: 'Recommended Resource ID', type: 'text' },
        { name: 'recommendedResourceType', label: 'Recommended Resource Type', type: 'text', required: true },
        { name: 'action', label: 'Action', type: 'text', required: true },
        { name: 'reason', label: 'Reason', type: 'textarea' },
        { name: 'recommenderId', label: 'Recommender ID', type: 'text', required: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyRecommendationsAgent', // Assign an agentId to the resource
};

export default RecommendationResource;
