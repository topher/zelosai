import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const UserActionResource = {
  resourceTypeId: ResourceType.UserAction,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadUserActionsAgent', // Assign an agentId to the resource
};

export default UserActionResource;
