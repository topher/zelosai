import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const OfferResource = {
  resourceTypeId: ResourceType.Offer,
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
  fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'price', label: 'Price', type: 'number', required: true },
        { name: 'priceCurrency', label: 'Price Currency', type: 'text', required: true },
        { name: 'availability', label: 'Availability', type: 'text', required: true },
        { name: 'validFrom', label: 'Valid From', type: 'text', required: true },
        { name: 'validThrough', label: 'Valid Through', type: 'text', required: true },
        { name: 'itemOffered', label: 'Item Offered', type: 'text', required: true },
        { name: 'sellerId', label: 'Seller ID', type: 'text', required: true },
        { name: 'buyerId', label: 'Buyer ID', type: 'text' },
        { name: 'offerType', label: 'Offer Type', type: 'text' },
        { name: 'termsOfService', label: 'Terms of Service', type: 'text' },
        { name: 'status', label: 'Status', type: 'text', required: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyOffersAgent', // Assign an agentId to the resource
};

export default OfferResource;
