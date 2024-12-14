import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ContractResource = {
  resourceTypeId: ResourceType.Contract,
  defaultPredicates: {
  "id": "required",
  "account_id": "required",
  "title": "required",
  "effective_date": "required",
  "expiration_date": "required",
  "status": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "id": "required",
  "account_id": "required",
  "title": "required",
  "effective_date": "required",
  "expiration_date": "required",
  "status": "required"
},ResourceType.Contract),
  agentId: 'leadContractsAgent', // Assign an agentId to the resource
};

export default ContractResource;
