import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const PersonaResource = {
  resourceTypeId: ResourceType.Persona,
  schema: Yup.object().shape({
        personaName: Yup.string().required('Persona Name is required'),
        description: Yup.string().required('Description is required'),
        type: Yup.string().required('Type is required'),
        AssociatedUseCases: Yup.array().of(Yup.string()).required('Associated Use Cases are required'),
        isPersona: Yup.boolean().default(true),
        image: Yup.string().required('Image URL is required'),
    }),
  fields: [
        { name: 'personaName', label: 'Persona Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'type', label: 'Type', type: 'text', required: true },
        { name: 'AssociatedUseCases', label: 'Associated Use Cases', type: 'autocomplete', resourceTypes: ['use_cases'], multiple: true, required: true },
        { name: 'isPersona', label: 'Is Persona', type: 'checkbox' },
        { name: 'image', label: 'Image URL', type: 'text', required: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyPersonasAgent', // Assign an agentId to the resource
};

export default PersonaResource;
