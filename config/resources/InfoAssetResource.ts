import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const InfoAssetResource = {
  resourceTypeId: ResourceType.InfoAsset,
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
},
  schema: generateSchemaFromDefaultPredicates({
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
},ResourceType.InfoAsset),
  agentId: 'leadInfoAssetsAgent', // Assign an agentId to the resource
};

export default InfoAssetResource;
