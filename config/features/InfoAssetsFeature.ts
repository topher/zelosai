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
    fields: [
        { name: 'URI', label: 'URI', type: 'text', required: true },
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'asset_type', label: 'Asset Type', type: 'text' },
        { name: 'content', label: 'Content', type: 'text' },
        { name: 'media_link', label: 'Media Link', type: 'text' },
        { name: 'mimetype', label: 'MIME Type', type: 'text' },
        { name: 'dc_creator', label: 'DC Creator', type: 'text' },
        { name: 'dc_description', label: 'DC Description', type: 'text' },
        { name: 'schema_dateCreated', label: 'Schema Date Created', type: 'text' },
        { name: 'labels', label: 'Labels', type: 'text', multiple: true },
        { name: 'status', label: 'Status', type: 'text' },
        { name: 'dcma_registrant_email', label: 'DCMA Registrant Email', type: 'text' },
        { name: 'read', label: 'Read', type: 'checkbox' },
        { name: 'creation_date', label: 'Creation Date', type: 'text', required: true },
        { name: 'entity_type', label: 'Entity Type', type: 'text' },
        { name: 'image', label: 'Image', type: 'text' },
        { name: 'linkedAIModels', label: 'Linked AI Models', type: 'autocomplete', resourceTypes: ['AIModels'], multiple: true },
        { name: 'relatedPersonas', label: 'Related Personas', type: 'autocomplete', resourceTypes: ['Personas'], multiple: true },
        { name: 'associatedContracts', label: 'Associated Contracts', type: 'autocomplete', resourceTypes: ['Contracts'], multiple: true },
    ],
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
    },
};
