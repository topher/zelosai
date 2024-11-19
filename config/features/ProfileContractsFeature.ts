import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const profileContractsFeature: Feature = {
    key: FeatureKey.ProfileContracts,
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
            contactInfo: Yup.string().required('Party Contact Info is required'),
        })).required('Parties are required'),
        sections: Yup.array().of(Yup.object().shape({
            // Define section schema as needed
        })),
        assets: Yup.array().of(Yup.object().shape({
            // Define asset schema as needed
        })),
        obligations: Yup.array().of(Yup.object().shape({
            debtorPartyId: Yup.string().required('Debtor Party ID is required'),
            creditorPartyId: Yup.string().required('Creditor Party ID is required'),
            status: Yup.string().required('Obligation Status is required'),
            dueDate: Yup.string().required('Due Date is required'),
        })),
        events: Yup.array().of(Yup.object().shape({
            // Define event schema as needed
        })),
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
        creatorAvatar: Yup.string(), // Optional property
        relatedInfoAssets: Yup.array().of(Yup.string()), // Optional property
        associatedAgents: Yup.array().of(Yup.string()), // Optional property
        relatedOffers: Yup.array().of(Yup.string()), // Optional property
        linkedTransactions: Yup.array().of(Yup.string()), // Optional property
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadProfileContract,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 100, 1000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateProfileContract,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateProfileContract,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteProfileContract,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 20, 200],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Profiles,
        icon: Target,
        label: 'Profile Contracts',
        href: '/profiles/contracts',
        description: 'Manage contract profiles.',
        isInProd: true,
        resourceName: 'profile_contracts',
        resourceType: ResourceType.ProfileContract,
        maxResourceCount: [10, 100, 1000],
    },
};
