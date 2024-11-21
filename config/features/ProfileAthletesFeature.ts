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
    fields: [
        { name: 'athleteName', label: 'Athlete Name', type: 'text', required: true },
        { name: 'sport', label: 'Sport', type: 'text', required: true },
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'country', label: 'Country', type: 'text', required: true },
        { name: 'bio', label: 'Bio', type: 'textarea', required: true },
        {
            name: 'relatedSports',
            label: 'Related Sports',
            type: 'autocomplete',
            resourceTypes: ['sports'],
            multiple: true,
            required: true,
        },
        {
            name: 'isActive',
            label: 'Is Active',
            type: 'checkbox',
        },
        {
            name: 'relatedEvents',
            label: 'Related Events',
            type: 'autocomplete',
            resourceTypes: ['events'],
            multiple: true,
        },
    ],
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
        resourceName: 'profile_athletes',
        resourceType: ResourceType.ProfileAthlete,
        maxResourceCount: [10, 100, 1000],
    },
};
