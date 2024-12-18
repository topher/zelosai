import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ProfileModelResource = {
  resourceTypeId: ResourceType.ProfileModel,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadProfileModelsAgent', // Assign an agentId to the resource
};

export default ProfileModelResource;
