import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const TopicResource = {
  resourceTypeId: ResourceType.Topic,
  schema: Yup.object().shape({
        category: Yup.string().required('Category is required'),
        description: Yup.string().required('Description is required'),
        preferences: Yup.array().of(Yup.string()).required('Preferences are required'),
        influencerName: Yup.string().required('Influencer Name is required'),
        brand: Yup.string().required('Brand is required'),
    }),
  fields: [
        { name: 'category', label: 'Category', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'preferences', label: 'Preferences', type: 'autocomplete', required: true },
        { name: 'influencerName', label: 'Influencer Name', type: 'text', required: true },
        { name: 'brand', label: 'Brand', type: 'text', required: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyTopicsAgent', // Assign an agentId to the resource
};

export default TopicResource;
