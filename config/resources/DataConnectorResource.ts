import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const DataConnectorResource = {
  resourceTypeId: ResourceType.DataConnector,
  defaultPredicates: {
  "name": "required",
  "description": "required",
  "icon": "required",
  "connection_type": "required",
  "disabled": "allowed",
  "metadata.email": "allowed",
  "metadata.api_key": "allowed",
  "metadata.username": "allowed",
  "metadata.password": "allowed",
  "metadata.shop_name": "allowed",
  "metadata.whitelist": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "name": "required",
  "description": "required",
  "icon": "required",
  "connection_type": "required",
  "disabled": "allowed",
  "metadata.email": "allowed",
  "metadata.api_key": "allowed",
  "metadata.username": "allowed",
  "metadata.password": "allowed",
  "metadata.shop_name": "allowed",
  "metadata.whitelist": "allowed"
},ResourceType.DataConnector),
  agentId: 'leadConnectorsAgent', // Assign an agentId to the resource
};

export default DataConnectorResource;
