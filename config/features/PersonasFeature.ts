import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const personasFeature: Feature = {
    key: FeatureKey.Personas,
    schema: Yup.object().shape({
        personaName: Yup.string().required('Persona Name is required'),
        description: Yup.string().required('Description is required'),
        type: Yup.string().required('Type is required'),
        AssociatedUseCases: Yup.array().of(Yup.string()).required('Associated Use Cases are required'),
        isPersona: Yup.boolean().default(true),
        image: Yup.string().required('Image URL is required'),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadPersona,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 50, 200],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreatePersona,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdatePersona,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeletePersona,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 10, 50],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Strategy,
        icon: Target,
        label: 'Personas',
        href: '/strategy/personas',
        description: 'Define target personas.',
        isInProd: true,
        resourceName: 'persona',
        resourceType: ResourceType.Persona,
        agentId: 'leadPersonasAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "persona_name": "required",
              "description": "required",
              "type": "required",
              "associated_use_cases": "required",
              "is_persona": "allowed",
              "image": "required"
            }
    },
};
