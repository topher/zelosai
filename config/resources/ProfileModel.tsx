import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const ProfileModelResource = {
  resourceTypeId: ResourceType.ProfileModel,
  schema: Yup.object().shape({
        // Define the schema for profile models
    }),
  fields: [
        // Define the fields for profile models
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyProfileModelsAgent', // Assign an agentId to the resource
};

export default ProfileModelResource;
