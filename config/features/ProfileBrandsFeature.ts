import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const profileBrandsFeature: Feature = {
    key: FeatureKey.ProfileBrands,
    schema: Yup.object().shape({
        // Define the schema for profile brands
    }),
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
        agentId: 'leadProfileBrandsAgent',
        requiredPredicates: [
              "has_name",
              "has_short_name",
              "has_description",
              "mission_vision",
              "sponsorship_activities",
              "channels",
              "primary_industry",
              "secondary_industry",
              "regions",
              "audience_lifestyle",
              "key_partners",
              "key_activities",
              "value_propositions",
              "customer_relationships",
              "customer_segments",
              "cost_structure",
              "revenue_streams"
            ],
        defaultPredicates: {
              "brand_name": "required",
              "description": "required",
              "logo": "required"
            }
    },
};
