import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const profileAthletesFeature: Feature = {
    key: FeatureKey.ProfileAthletes,
    schema: Yup.object().shape({
        athleteName: Yup.string().required('Athlete Name is required'),
        sport: Yup.string().required('Sport is required'),
        age: Yup.number().required('Age is required'),
        country: Yup.string().required('Country is required'),
        bio: Yup.string().required('Bio is required'),
        isActive: Yup.boolean().default(true),
        relatedSports: Yup.array().of(Yup.string()).required('Related Sports are required'),
        relatedEvents: Yup.array().of(Yup.string()),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadProfileAthlete,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 100, 1000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateProfileAthlete,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateProfileAthlete,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteProfileAthlete,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 20, 200],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Profiles,
        icon: Target,
        label: 'Profile Athletes',
        href: '/profiles/athletes',
        description: 'Manage athlete profiles.',
        isInProd: true,
        resourceName: 'athletes_triples',
        resourceType: ResourceType.ProfileAthlete,
        maxResourceCount: [10, 100, 1000],
        agentId: 'leadProfileAthletesAgent',
        requiredPredicates: [
              "represents_noc",
              "has_name",
              "has_short_name",
              "participates_in_sport",
              "represents_location",
              "has_occupation",
              "has_family",
              "speaks_language",
              "belongs_to_club",
              "has_coach",
              "has_position_style",
              "has_sporting_relatives",
              "has_injuries",
              "competes_in_national_league",
              "has_award",
              "has_achievements",
              "has_description",
              "has_start",
              "has_reason",
              "has_ambition",
              "has_training",
              "has_influence",
              "has_interest"
            ],
        defaultPredicates: {
              "athlete_name": "required",
              "sport": "required",
              "age": "required",
              "country": "required",
              "bio": "required",
              "related_sports": "required",
              "is_active": "allowed",
              "related_events": "allowed"
            }
    },
};
