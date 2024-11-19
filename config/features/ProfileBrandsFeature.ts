import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const profileBrandsFeature: Feature = {
    key: FeatureKey.ProfileBrands,
    schema: Yup.object().shape({
        // Define the schema for profile brands
    }),
    fields: [
        { name: 'BrandName', label: 'Brand Name', type: 'text', required: true },
        { name: 'Description', label: 'Description', type: 'textarea', required: true },
        { name: 'Logo', label: 'Logo', type: 'text', required: true },
        // Add more fields as needed
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadProfileBrand,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 100, 1000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateProfileBrand,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateProfileBrand,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteProfileBrand,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 20, 200],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Profiles,
        icon: Target,
        label: 'Profile Brands',
        href: '/profiles/brands',
        description: 'Manage brand profiles.',
        isInProd: true,
        resourceName: 'profile_brands',
        resourceType: ResourceType.ProfileBrand,
        maxResourceCount: [10, 100, 1000],
    },
};
