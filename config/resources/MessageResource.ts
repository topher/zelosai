import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const MessageResource = {
  resourceTypeId: ResourceType.Message,
  defaultPredicates: {
  "content": "required",
  "recipient_id": "required",
  "message_type": "required",
  "attachments": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "content": "required",
  "recipient_id": "required",
  "message_type": "required",
  "attachments": "required"
},ResourceType.Message),
  agentId: 'leadMessagesAgent', // Assign an agentId to the resource
};

export default MessageResource;
