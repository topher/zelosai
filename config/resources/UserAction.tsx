import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const UserActionResource = {
  resourceTypeId: ResourceType.UserAction,
  schema: Yup.object().shape({
        // Define the schema for User Actions feature
    }),
  fields: [
        // Define fields for User Actions feature
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyUserActionsAgent', // Assign an agentId to the resource
};

export default UserActionResource;
