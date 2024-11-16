import * as Yup from 'yup';
import { Search } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const searchableUsersFeature: Feature = {
    key: FeatureKey.SearchableUsers,
    schema: Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        role: Yup.string().required('Role is required'),
        isActive: Yup.boolean().default(true),
        profileImage: Yup.string().url('Invalid URL format'),
        relatedContacts: Yup.array().of(Yup.string()),
    }),
    fields: [
        { name: 'username', label: 'Username', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'text', required: true },
        { name: 'role', label: 'Role', type: 'text', required: true },
        { name: 'isActive', label: 'Is Active', type: 'checkbox' },
        { name: 'profileImage', label: 'Profile Image', type: 'text' },
        {
            name: 'relatedContacts',
            label: 'Related Contacts',
            type: 'autocomplete',
            resourceTypes: ['contacts'],
            multiple: true,
        },
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadSearchableUser,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [0, 1000, 10000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateSearchableUser,
            action: 'create',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 500, 5000],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateSearchableUser,
            action: 'update',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 500, 5000],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteSearchableUser,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 200, 2000],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Search,
        icon: Search,
        label: 'Users',
        href: '/search/users',
        description: 'Search through user profiles.',
        isInProd: false,
        resourceName: 'users',
        resourceType: 'SearchableUser',
        maxResourceCount: [0, 1000, 10000],
    },
};
