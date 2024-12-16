import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ProfileContractResource = {
  resourceTypeId: ResourceType.ProfileContract,
  defaultPredicates: {},
  schema: generateSchemaFromDefaultPredicates({}),
  agentId: 'leadProfileContractsAgent', // Assign an agentId to the resource
};

export default ProfileContractResource;
