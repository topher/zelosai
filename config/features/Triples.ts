import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const triplesFeature: Feature = {
    key: FeatureKey.Triples,
    schema: Yup.object().shape({
      subject: Yup.string().required('Subject is required').max(255, 'Subject is too long'),
      predicate: Yup.string().required('Predicate is required').max(255, 'Predicate is too long'),
      object: Yup.string().required('Object is required').max(1024, 'Object is too long'),
      citation: Yup.string().max(1024, 'Citation is too long').nullable(),
      visibility: Yup.string().oneOf(['public', 'private']).required('Visibility is required'),
      profileId: Yup.string().required('Profile ID is required'), // Ensure profileId is present
    }),
    fields: [
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        required: true,
      },
      {
        name: 'predicate',
        label: 'Predicate',
        type: 'text',
        required: true,
      },
      {
        name: 'object',
        label: 'Object',
        type: 'text',
        required: true,
      },
      {
        name: 'citation',
        label: 'Citation',
        type: 'text',
        required: false,
      },
      {
        name: 'visibility',
        label: 'Visibility',
        type: 'select',
        required: true,
        options: ['public', 'private'],
      },
      {
        name: 'profileId',
        label: 'Profile',
        type: 'autocomplete', // Assuming you have an autocomplete component to select profiles
        required: true,
        resourceTypes: ['ProfileUser', 'ProfileAthlete', 'ProfileBrand'],
      },
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadTriple,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [5, 20, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateTriple,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [2, 10, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateTriple,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [2, 10, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteTriple,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 5, 20],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Dashboard,
        icon: Target,
        description: 'Manage triples notifications.',
        isInProd: true,
        href: '/dashboard/search/triples',
        resourceType: ResourceType.Triple,
        resourceName: 'triples',
        label: 'Triple',
    }
};