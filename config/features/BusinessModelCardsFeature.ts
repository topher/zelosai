import * as Yup from 'yup';
import { Target } from 'lucide-react';
import { Feature, FeatureCategory, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const businessModelFeature: Feature = {
    key: FeatureKey.BusinessModel,
    schema: Yup.object().shape({
        companyName: Yup.string().required('Company Name is required'),
        logo: Yup.string().required('Logo is required'),
        industry: Yup.string().required('Industry is required'),
        location: Yup.string().required('Location is required'),
        foundedYear: Yup.number().required('Founded Year is required'),
        description: Yup.string().required('Description is required'),
        website: Yup.string().required('Website is required'),
        socialMedia: Yup.object().shape({
            linkedin: Yup.string(),
            twitter: Yup.string(),
            facebook: Yup.string(),
        }),
        customerSegments: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            name: Yup.string().required('Segment Name is required'),
            description: Yup.string().required('Segment Description is required'),
        })),
        valuePropositions: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            name: Yup.string().required('Value Proposition Name is required'),
            description: Yup.string().required('Value Proposition Description is required'),
        })),
        channels: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            name: Yup.string().required('Channel Name is required'),
            description: Yup.string().required('Channel Description is required'),
        })),
        customerRelationships: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            name: Yup.string().required('Relationship Name is required'),
            description: Yup.string().required('Relationship Description is required'),
        })),
        revenueStreams: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            name: Yup.string().required('Stream Name is required'),
            description: Yup.string().required('Stream Description is required'),
        })),
        keyResources: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            name: Yup.string().required('Resource Name is required'),
            description: Yup.string().required('Resource Description is required'),
        })),
        keyActivities: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            name: Yup.string().required('Activity Name is required'),
            description: Yup.string().required('Activity Description is required'),
        })),
        keyPartners: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            name: Yup.string().required('Partner Name is required'),
            description: Yup.string().required('Partner Description is required'),
        })),
        cost: Yup.array().of(Yup.object().shape({
            id: Yup.string(),
            name: Yup.string().required('Cost Name is required'),
            description: Yup.string().required('Cost Description is required'),
        })),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadBusinessModel,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [1, 5, 15],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateBusinessModel,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateBusinessModel,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteBusinessModel,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 1, 5],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Strategy,
        icon: Target,
        label: 'Business Model',
        href: '/strategy/plan',
        description: 'Manage business models.',
        isInProd: true,
        resourceName: 'business_model_cards',
        maxResourceCount: [1, 5, 15],
        resourceType: "BusinessModelCard"
    },
};