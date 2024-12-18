import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const ProfileUserResource = {
  resourceTypeId: ResourceType.ProfileUser,
  schema: Yup.object().shape({
        // Define the schema for profile users
    }),
  fields: [
        { name: 'Field1', label: 'Field 1', type: 'text', required: true },
        { name: 'Field2', label: 'Field 2', type: 'textarea', required: true },
        // Add more field configurations as needed
    ],
  requiredPredicates: [
  "has_name",
  "has_occupation",
  "has_family",
  "speaks_language",
  "has_award",
  "has_achievements",
  "has_description",
  "has_reason",
  "has_ambition",
  "has_influence",
  "has_interest"
],
  agentId: 'leadFeatureKeyProfileUsersAgent', // Assign an agentId to the resource
};

export default ProfileUserResource;
