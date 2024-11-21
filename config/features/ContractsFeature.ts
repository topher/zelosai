import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, ActionFeatureKey, SubscriptionTier, FeatureKey } from '@/config/featuresConfig';

export const contractsFeature: Feature = {
    key: FeatureKey.Contracts,
    schema: Yup.object().shape({
        id: Yup.string().required('ID is required'),
        accountId: Yup.string().required('Account ID is required'),
        title: Yup.string().required('Title is required'),
        effectiveDate: Yup.string().required('Effective Date is required'),
        expirationDate: Yup.string().required('Expiration Date is required'),
        status: Yup.string().required('Status is required'),
        parties: Yup.array().of(Yup.object().shape({
            id: Yup.string().required('Party ID is required'),
            name: Yup.string().required('Party Name is required'),
            role: Yup.string().required('Party Role is required'),
            contactInfo: Yup.string().required('Contact Info is required'),
        })).required('Parties are required'),
        sections: Yup.array().of(Yup.object()),
        assets: Yup.array().of(Yup.object()),
        obligations: Yup.array().of(Yup.object().shape({
            debtorPartyId: Yup.string().required('Debtor Party ID is required'),
            creditorPartyId: Yup.string().required('Creditor Party ID is required'),
            status: Yup.string().required('Obligation Status is required'),
            dueDate: Yup.string().required('Due Date is required'),
        })).required('Obligations are required'),
        events: Yup.array().of(Yup.object()),
        creationDate: Yup.string().required('Creation Date is required'),
        lastUpdated: Yup.string().required('Last Updated Date is required'),
        contract_creator: Yup.string().required('Contract Creator is required'),
        emoji: Yup.string().required('Emoji is required'),
        cover: Yup.string().required('Cover is required'),
        creator: Yup.string().required('Creator is required'),
        description: Yup.string().required('Description is required'),
        rights: Yup.string().required('Rights are required'),
        schemaDateCreated: Yup.string().required('Schema Date Created is required'),
        schemaContentUrl: Yup.string().required('Schema Content URL is required'),
        schemaContentType: Yup.string().required('Schema Content Type is required'),
        tags: Yup.array().of(Yup.string()).required('Tags are required'),
        uri: Yup.string().required('URI is required'),
        creatorAvatar: Yup.string(),
        relatedInfoAssets: Yup.array().of(Yup.string()),
        associatedAgents: Yup.array().of(Yup.string()),
        relatedOffers: Yup.array().of(Yup.string()),
        linkedTransactions: Yup.array().of(Yup.string()),
    }),
    fields: [
        { name: 'id', label: 'ID', type: 'text', required: true },
        { name: 'accountId', label: 'Account ID', type: 'text', required: true },
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'effectiveDate', label: 'Effective Date', type: 'text', required: true },
        { name: 'expirationDate', label: 'Expiration Date', type: 'text', required: true },
        { name: 'status', label: 'Status', type: 'text', required: true },
        // Add other fields as needed
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadContract,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [1, 5, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateContract,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateContract,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteContract,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 5, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Marketplace,
        icon: Target,
        label: 'Contracts',
        href: '/deals/contracts',
        description: 'Manage your contracts.',
        isInProd: true,
        resourceName: 'contracts',
        resourceType: ResourceType.Contract,
        maxResourceCount: [1, 5, 100],
    },
};
