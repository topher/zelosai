import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const OfferResource = {
  resourceTypeId: ResourceType.Offer,
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
},
  schema: generateSchemaFromDefaultPredicates({
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
},ResourceType.Offer),
  agentId: 'leadOffersAgent', // Assign an agentId to the resource
};

export default OfferResource;
