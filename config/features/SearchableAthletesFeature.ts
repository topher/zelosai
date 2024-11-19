import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const searchableAthletesFeature: Feature = {
    key: FeatureKey.SearchableAthletes,
    schema: Yup.object().shape({
        // Define the schema for athlete profiles
    }),
    fields: [
        // Define fields for athlete profiles
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadSearchableAthlete,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [100, 1000, 10000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateSearchableAthlete,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [50, 500, 5000],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateSearchableAthlete,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [50, 500, 5000],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteSearchableAthlete,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [20, 200, 2000],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Search,
        icon: Target,
        label: 'Athletes',
        href: '/search/athletes',
        description: 'Search through athlete profiles.',
        isInProd: true,
        resourceName: 'athletes_triples',
        resourceType: ResourceType.SearchableAthlete,
        maxResourceCount: [100, 1000, 10000],
    },
};