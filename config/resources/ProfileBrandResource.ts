import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ProfileBrandResource = {
  resourceTypeId: ResourceType.ProfileBrand,
  defaultPredicates: {
  "brand_name": "required",
  "description": "required",
  "logo": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "brand_name": "required",
  "description": "required",
  "logo": "required"
},ResourceType.ProfileBrand),
  agentId: 'leadProfileBrandsAgent', // Assign an agentId to the resource
};

export default ProfileBrandResource;
