import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const InfoAssetResource = {
  resourceTypeId: ResourceType.InfoAsset,
  schema: Yup.object().shape({
        URI: Yup.string().required('URI is required'),
        name: Yup.string().required('Name is required'),
        category: Yup.string(),
        asset_type: Yup.string(),
        content: Yup.string(),
        media_link: Yup.string(),
        mimetype: Yup.string(),
        dc_creator: Yup.string(),
        dc_description: Yup.string(),
        schema_dateCreated: Yup.string(),
        labels: Yup.array().of(Yup.string()),
        status: Yup.string(),
        dcma_registrant_email: Yup.string(),
        read: Yup.boolean(),
        creation_date: Yup.string().required('Creation Date is required'),
        entity_type: Yup.string(),
        image: Yup.string(),
        linkedAIModels: Yup.array().of(Yup.string()),
        relatedPersonas: Yup.array().of(Yup.string()),
        associatedContracts: Yup.array().of(Yup.string()),
    }),
  fields: [
        { name: 'URI', label: 'URI', type: 'text', required: true },
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'asset_type', label: 'Asset Type', type: 'text' },
        { name: 'content', label: 'Content', type: 'text' },
        { name: 'media_link', label: 'Media Link', type: 'text' },
        { name: 'mimetype', label: 'MIME Type', type: 'text' },
        { name: 'dc_creator', label: 'DC Creator', type: 'text' },
        { name: 'dc_description', label: 'DC Description', type: 'text' },
        { name: 'schema_dateCreated', label: 'Schema Date Created', type: 'text' },
        { name: 'labels', label: 'Labels', type: 'text', multiple: true },
        { name: 'status', label: 'Status', type: 'text' },
        { name: 'dcma_registrant_email', label: 'DCMA Registrant Email', type: 'text' },
        { name: 'read', label: 'Read', type: 'checkbox' },
        { name: 'creation_date', label: 'Creation Date', type: 'text', required: true },
        { name: 'entity_type', label: 'Entity Type', type: 'text' },
        { name: 'image', label: 'Image', type: 'text' },
        { name: 'linkedAIModels', label: 'Linked AI Models', type: 'autocomplete', resourceTypes: ['AIModels'], multiple: true },
        { name: 'relatedPersonas', label: 'Related Personas', type: 'autocomplete', resourceTypes: ['Personas'], multiple: true },
        { name: 'associatedContracts', label: 'Associated Contracts', type: 'autocomplete', resourceTypes: ['Contracts'], multiple: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyInfoAssetsAgent', // Assign an agentId to the resource
};

export default InfoAssetResource;
