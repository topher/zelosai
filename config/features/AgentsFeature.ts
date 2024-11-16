import * as Yup from 'yup';
import { Target } from 'lucide-react';
import { Feature, ActionFeature, FeatureMetadata, ActionFeatureKey, SubscriptionTier, FeatureCategory, FeatureKey } from '@/config/featuresConfig';

export const agentsFeature: Feature = {
    key: FeatureKey.Agents,
    schema: Yup.object().shape({
        agentType: Yup.string().required('Agent Type is required'),
        name: Yup.string().required('Name is required'),
        expertiseAreas: Yup.array().of(Yup.string()).required('Expertise Areas are required'),
        availabilityStatus: Yup.string().required('Availability Status is required'),
        aiCapabilities: Yup.object().shape({
            supportedLanguages: Yup.array().of(Yup.string()).required('Supported Languages are required'),
            responseTime: Yup.number().required('Response Time is required'),
            integrations: Yup.array().of(Yup.string()).required('Integrations are required'),
        }),
        linkedModels: Yup.array().of(Yup.string()),
        linkedPersonas: Yup.array().of(Yup.string()),
        associatedWorkflows: Yup.array().of(Yup.string()),
        contactInfo: Yup.object().shape({
            // Define contact info schema if needed
        }),
    }),
    fields: [
        { name: 'agentType', label: 'Agent Type', type: 'text', required: true },
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'expertiseAreas', label: 'Expertise Areas', type: 'autocomplete', required: true },
        { name: 'availabilityStatus', label: 'Availability Status', type: 'text', required: true },
        // Add more fields as needed
    ],
    actions: [
        {
            actionKey: ActionFeatureKey.ReadAgent,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [10, 50, 200],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateAgent,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateAgent,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 25, 100],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteAgent,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [2, 10, 50],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Workflows,
        icon: Target,
        label: 'Agents',
        href: '/workflows/agents',
        description: 'Manage agents within workflows.',
        isInProd: true,
        resourceName: 'agents',
        resourceType: 'Agent',
    },
};