import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const TransactionResource = {
  resourceTypeId: ResourceType.Transaction,
  defaultPredicates: {
  "transaction_type": "required",
  "amount": "required",
  "currency": "required",
  "sender_id": "required",
  "recipient_id": "required",
  "transaction_date": "required",
  "status": "required",
  "related_resource_id": "allowed",
  "notes": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "transaction_type": "required",
  "amount": "required",
  "currency": "required",
  "sender_id": "required",
  "recipient_id": "required",
  "transaction_date": "required",
  "status": "required",
  "related_resource_id": "allowed",
  "notes": "allowed"
},ResourceType.Transaction),
  agentId: 'leadTransactionsAgent', // Assign an agentId to the resource
};

export default TransactionResource;
