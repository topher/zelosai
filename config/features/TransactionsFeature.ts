import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const transactionsFeature: Feature = {
    key: FeatureKey.Transactions,
    schema: Yup.object().shape({
        transactionType: Yup.string().required('Transaction Type is required'),
        amount: Yup.number().required('Amount is required'),
        currency: Yup.string().required('Currency is required'),
        senderId: Yup.string().required('Sender ID is required'),
        recipientId: Yup.string().required('Recipient ID is required'),
        transactionDate: Yup.string().required('Transaction Date is required'),
        status: Yup.string().required('Status is required'),
        relatedResourceId: Yup.string(),
        notes: Yup.string(),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadTransaction,
            action: 'read',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [3, 100, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateTransaction,
            action: 'create',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 50, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateTransaction,
            action: 'update',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 50, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteTransaction,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 10, 10],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Marketplace,
        icon: Target,
        label: 'Transactions',
        href: '/deals/transactions',
        description: 'Manage your transactions.',
        isInProd: false,
        resourceName: 'transactions',
        resourceType: ResourceType.Transaction,
        maxResourceCount: [3, 100, 100],
        agentId: 'leadTransactionsAgent',
        requiredPredicates: [],
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
            }
    },
};
