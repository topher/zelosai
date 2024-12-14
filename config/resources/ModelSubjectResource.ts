import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ModelSubjectResource = {
  resourceTypeId: ResourceType.ModelSubject,
  defaultPredicates: {
  "subject_name": "required",
  "description": "required",
  "expertise_level": "required",
  "related_models": "required",
  "related_training_ids": "allowed",
  "associated_personas": "allowed",
  "linked_info_assets": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "subject_name": "required",
  "description": "required",
  "expertise_level": "required",
  "related_models": "required",
  "related_training_ids": "allowed",
  "associated_personas": "allowed",
  "linked_info_assets": "allowed"
},ResourceType.ModelSubject),
  agentId: 'leadModelSubjectsAgent', // Assign an agentId to the resource
};

export default ModelSubjectResource;
