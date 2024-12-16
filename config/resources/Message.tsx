import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const MessageResource = {
  resourceTypeId: ResourceType.Message,
  schema: Yup.object().shape({
        content: Yup.string().required('Message content is required'),
        recipientId: Yup.string().required('Recipient ID is required'),
        messageType: Yup.string().required('Message type is required'),
        attachments: Yup.array().of(Yup.object().shape({
            url: Yup.string().required('Attachment URL is required'),
            filename: Yup.string().required('Attachment filename is required'),
            contentType: Yup.string().required('Attachment content type is required'),
            size: Yup.number().required('Attachment size is required'),
        })),
    }),
  fields: [
        { name: 'content', label: 'Content', type: 'textarea', required: true },
        { name: 'recipientId', label: 'Recipient ID', type: 'text', required: true },
        { name: 'messageType', label: 'Message Type', type: 'text', required: true },
        { name: 'attachments', label: 'Attachments', type: 'autocomplete', required: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyMessagesAgent', // Assign an agentId to the resource
};

export default MessageResource;
