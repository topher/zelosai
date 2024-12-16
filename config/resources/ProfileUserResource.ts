import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ProfileUserResource = {
  resourceTypeId: ResourceType.ProfileUser,
  defaultPredicates: {
  "field1": "required",
  "field2": "required"
},
  schema: generateSchemaFromDefaultPredicates({
  "field1": "required",
  "field2": "required"
}),
  agentId: 'leadProfileUsersAgent', // Assign an agentId to the resource
};

export default ProfileUserResource;
