  import { ResourceType } from '../resourceTypes';
  import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

  export const WorkflowResource = {
    resourceTypeId: ResourceType.Workflow,
    defaultPredicates: {
    "name": "required"
  },
    schema: generateSchemaFromDefaultPredicates({
    "name": "required"
  },ResourceType.Workflow),
    agentId: 'leadFeatureKeyWorkflowsAgent', // Assign an agentId to the resource
  };

  export default WorkflowResource;
