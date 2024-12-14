import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const ModelSubjectResource = {
  resourceTypeId: ResourceType.ModelSubject,
  schema: Yup.object().shape({
        subjectName: Yup.string().required('Subject Name is required'),
        description: Yup.string().required('Description is required'),
        expertiseLevel: Yup.string().required('Expertise Level is required'),
        relatedModels: Yup.array().of(Yup.string()).required('Related Models are required'),
        relatedTrainingIds: Yup.array().of(Yup.string()),
        associatedPersonas: Yup.array().of(Yup.string()),
        linkedInfoAssets: Yup.array().of(Yup.string()),
    }),
  fields: [
        { name: 'subjectName', label: 'Subject Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'expertiseLevel', label: 'Expertise Level', type: 'text', required: true },
        { name: 'relatedModels', label: 'Related Models', type: 'autocomplete', resourceTypes: ['AI Models'], multiple: true, required: true },
        { name: 'relatedTrainingIds', label: 'Related Training IDs', type: 'autocomplete', resourceTypes: ['Model Training'], multiple: true },
        { name: 'associatedPersonas', label: 'Associated Personas', type: 'autocomplete', resourceTypes: ['Personas'], multiple: true },
        { name: 'linkedInfoAssets', label: 'Linked Info Assets', type: 'autocomplete', resourceTypes: ['Info Assets'], multiple: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyModelSubjectsAgent', // Assign an agentId to the resource
};

export default ModelSubjectResource;
