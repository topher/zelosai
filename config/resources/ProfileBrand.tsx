import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const ProfileBrandResource = {
  resourceTypeId: ResourceType.ProfileBrand,
  schema: Yup.object().shape({
        // Define the schema for profile brands
    }),
  fields: [
        { name: 'BrandName', label: 'Brand Name', type: 'text', required: true },
        { name: 'Description', label: 'Description', type: 'textarea', required: true },
        { name: 'Logo', label: 'Logo', type: 'text', required: true },
        // Add more fields as needed
    ],
  requiredPredicates: [
  "has_name",
  "has_short_name",
  "has_description",
  "mission_vision",
  "sponsorship_activities",
  "channels",
  "primary_industry",
  "secondary_industry",
  "regions",
  "audience_lifestyle",
  "key_partners",
  "key_activities",
  "value_propositions",
  "customer_relationships",
  "customer_segments",
  "cost_structure",
  "revenue_streams"
],
  agentId: 'leadFeatureKeyProfileBrandsAgent', // Assign an agentId to the resource
};

export default ProfileBrandResource;
