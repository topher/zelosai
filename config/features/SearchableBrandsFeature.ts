import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const searchableBrandsFeature: Feature = {
    key: FeatureKey.SearchableBrands,
    schema: Yup.object().shape({
        // Define the schema for searchable brands feature
    }),
    fields: [
        // Define fields for searchable brands feature
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadSearchableBrand,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [100, 1000, 10000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateSearchableBrand,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [50, 500, 5000],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateSearchableBrand,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [50, 500, 5000],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteSearchableBrand,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [20, 200, 2000],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Search,
        icon: Target,
        label: 'Brands',
        href: '/search/brands',
        description: 'Search through brand profiles.',
        isInProd: true,
        resourceName: 'brands_triples',
        resourceType: ResourceType.SearchableBrand,
        maxResourceCount: [100, 1000, 10000],
    },
};