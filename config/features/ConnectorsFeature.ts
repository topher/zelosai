import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const connectorsFeature: Feature = {
    key: FeatureKey.Connectors,
    schema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        icon: Yup.string().required('Icon is required'),
        connectionType: Yup.string().required('Connection Type is required'),
        disabled: Yup.boolean().default(false),
        metadata: Yup.object().shape({
            email: Yup.string().email('Invalid email format'),
            api_key: Yup.string(),
            username: Yup.string(),
            password: Yup.string(),
            shop_name: Yup.string(),
            whitelist: Yup.array().of(Yup.string()),
        }),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadConnector,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [1, 5, 15],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateConnector,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateConnector,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 3, 10],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteConnector,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [0, 1, 5],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.KnowledgeBank,
        icon: Target,
        label: 'Connectors',
        href: '/assets/connectors',
        description: 'Manage data connectors.',
        isInProd: true,
        resourceName: 'connectors',
        resourceType: ResourceType.DataConnector,
        maxResourceCount: [1, 5, 15],
        agentId: 'leadConnectorsAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "name": "required",
              "description": "required",
              "icon": "required",
              "connection_type": "required",
              "disabled": "allowed",
              "metadata.email": "allowed",
              "metadata.api_key": "allowed",
              "metadata.username": "allowed",
              "metadata.password": "allowed",
              "metadata.shop_name": "allowed",
              "metadata.whitelist": "allowed"
            }
    },
};