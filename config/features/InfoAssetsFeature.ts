import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const infoAssetsFeature: Feature = {
    key: FeatureKey.InfoAssets,
    schema: Yup.object().shape({
        URI: Yup.string().required('URI is required'),
        name: Yup.string().required('Name is required'),
        category: Yup.string(),
        asset_type: Yup.string(),
        content: Yup.string(),
        media_link: Yup.string(),
        mimetype: Yup.string(),
        dc_creator: Yup.string(),
        dc_description: Yup.string(),
        schema_dateCreated: Yup.string(),
        labels: Yup.array().of(Yup.string()),
        status: Yup.string(),
        dcma_registrant_email: Yup.string(),
        read: Yup.boolean(),
        creation_date: Yup.string().required('Creation Date is required'),
        entity_type: Yup.string(),
        image: Yup.string(),
        linkedAIModels: Yup.array().of(Yup.string()),
        relatedPersonas: Yup.array().of(Yup.string()),
        associatedContracts: Yup.array().of(Yup.string()),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadInfoAsset,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [5, 100, 1000],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateInfoAsset,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateInfoAsset,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [5, 50, 500],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteInfoAsset,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [3, 30, 300],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.KnowledgeBank,
        icon: Target,
        label: 'Info Assets',
        href: '/assets/inventory',
        description: 'Manage information assets.',
        isInProd: true,
        resourceName: 'info_assets',
        resourceType: ResourceType.InfoAsset,
        maxResourceCount: [5, 100, 1000],
        agentId: 'leadInfoAssetsAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "uri": "required",
              "name": "required",
              "category": "allowed",
              "asset_type": "allowed",
              "content": "allowed",
              "media_link": "allowed",
              "mimetype": "allowed",
              "dc_creator": "allowed",
              "dc_description": "allowed",
              "schema_date_created": "allowed",
              "labels": "allowed",
              "status": "allowed",
              "dcma_registrant_email": "allowed",
              "read": "allowed",
              "creation_date": "required",
              "entity_type": "allowed",
              "image": "allowed",
              "linked_aimodels": "allowed",
              "related_personas": "allowed",
              "associated_contracts": "allowed"
            }
    },
};
