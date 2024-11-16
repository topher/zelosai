import * as Yup from 'yup';
import { Target } from 'lucide-react'; // Import the specific icon for Branding
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const brandingFeature: Feature = {
    key: FeatureKey.Branding,
    schema: Yup.object().shape({
        // Define the schema for Branding feature fields
    }),
    fields: [
        // Define the field configurations for Branding feature
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadBranding,
            action: 'read',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 5, 15],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateBranding,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateBranding,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteBranding,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 1, 5],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Strategy,
        icon: Target,
        label: 'Brand Identity',
        href: '/strategy/branding',
        description: 'Manage branding models.',
        isInProd: true,
        resourceName: 'brand_model_cards',
        resourceType: 'BrandModelCard',
        maxResourceCount: [3, 10, 30],
    },
};