import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { MessageCircle } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const messagesFeature: Feature = {
    key: FeatureKey.Messages,
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
    actions: [
        {
            actionKey: ActionFeatureKey.ReadMessage,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [3, 100, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateMessage,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 50, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateMessage,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 50, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteMessage,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 10, 10],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Marketplace,
        icon: MessageCircle,
        label: 'Messages',
        href: '/deals/messages',
        description: 'Manage your messages.',
        isInProd: false,
        resourceName: 'messages',
        resourceType: ResourceType.Message,
        maxResourceCount: [3, 100, 100],
        agentId: 'leadMessagesAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "content": "required",
              "recipient_id": "required",
              "message_type": "required",
              "attachments": "required"
            }
    },
};
