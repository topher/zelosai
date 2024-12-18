import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Target } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const offersFeature: Feature = {
    key: FeatureKey.Offers,
    schema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required'),
        priceCurrency: Yup.string().required('Price Currency is required'),
        availability: Yup.string().required('Availability is required'),
        validFrom: Yup.string().required('Valid From date is required'),
        validThrough: Yup.string().required('Valid Through date is required'),
        itemOffered: Yup.string().required('Item Offered is required'),
        sellerId: Yup.string().required('Seller ID is required'),
        buyerId: Yup.string(),
        offerType: Yup.string(),
        termsOfService: Yup.string(),
        status: Yup.string().required('Status is required'),
    }),
    actions: [
        {
            actionKey: ActionFeatureKey.ReadOffer,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [3, 100, 100],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateOffer,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 50, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateOffer,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [1, 50, 50],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteOffer,
            action: 'delete',
            baseTier: SubscriptionTier.ENTERPRISE,
            resourceLimits: [1, 10, 10],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Deals,
        icon: Target,
        label: 'Offers',
        href: '/deals/offers',
        description: 'Manage your offers.',
        isInProd: false,
        resourceName: 'offers',
        resourceType: ResourceType.Offer,
        maxResourceCount: [3, 100, 100],
        agentId: 'leadOffersAgent',
        requiredPredicates: [],
        defaultPredicates: {
              "name": "required",
              "description": "required",
              "price": "required",
              "price_currency": "required",
              "availability": "required",
              "valid_from": "required",
              "valid_through": "required",
              "item_offered": "required",
              "seller_id": "required",
              "buyer_id": "allowed",
              "offer_type": "allowed",
              "terms_of_service": "allowed",
              "status": "required"
            }
    },
};
