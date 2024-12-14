import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const DataConnectorResource = {
  resourceTypeId: ResourceType.DataConnector,
  schema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        icon: Yup.string().required('Icon is required'),
        connectionType: Yup.string().required('Connection Type is required'),
        disabled: Yup.boolean().default(false),
        metadata: Yup.object().shape({
            email: Yup.string().email('Invalid email format'),
            api_key: Yup.string(),
            username: Yup.string(),
            password: Yup.string(),
            shop_name: Yup.string(),
            whitelist: Yup.array().of(Yup.string()),
        }),
    }),
  fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'icon', label: 'Icon', type: 'text', required: true },
        { name: 'connectionType', label: 'Connection Type', type: 'text', required: true },
        { name: 'disabled', label: 'Disabled', type: 'checkbox' },
        { name: 'metadata.email', label: 'Email', type: 'text', required: false },
        { name: 'metadata.api_key', label: 'API Key', type: 'text', required: false },
        { name: 'metadata.username', label: 'Username', type: 'text', required: false },
        { name: 'metadata.password', label: 'Password', type: 'text', required: false },
        { name: 'metadata.shop_name', label: 'Shop Name', type: 'text', required: false },
        { name: 'metadata.whitelist', label: 'Whitelist', type: 'autocomplete', required: false },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyConnectorsAgent', // Assign an agentId to the resource
};

export default DataConnectorResource;
