import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const AgentResource = {
  resourceTypeId: ResourceType.Agent,
  schema: Yup.object().shape({
        agentType: Yup.string().required('Agent Type is required'),
        name: Yup.string().required('Name is required'),
        expertiseAreas: Yup.array().of(Yup.string()).required('Expertise Areas are required'),
        availabilityStatus: Yup.string().required('Availability Status is required'),
        aiCapabilities: Yup.object().shape({
            supportedLanguages: Yup.array().of(Yup.string()).required('Supported Languages are required'),
            responseTime: Yup.number().required('Response Time is required'),
            integrations: Yup.array().of(Yup.string()).required('Integrations are required'),
        }),
        linkedModels: Yup.array().of(Yup.string()),
        linkedPersonas: Yup.array().of(Yup.string()),
        associatedWorkflows: Yup.array().of(Yup.string()),
        contactInfo: Yup.object().shape({
            // Define contact info schema if needed
        }),
    }),
  fields: [
        { name: 'agentType', label: 'Agent Type', type: 'text', required: true },
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'expertiseAreas', label: 'Expertise Areas', type: 'autocomplete', required: true },
        { name: 'availabilityStatus', label: 'Availability Status', type: 'text', required: true },
        // Add more fields as needed
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyAgentsAgent', // Assign an agentId to the resource
};

export default AgentResource;
