import { ResourceType } from '../resourceTypes';
import { generateSchemaFromDefaultPredicates } from '../schemaUtils';

export const ScheduledEventResource = {
  resourceTypeId: ResourceType.ScheduledEvent,
  defaultPredicates: {
  "name": "required",
  "description": "allowed",
  "start_date": "required",
  "end_date": "allowed",
  "location": "allowed",
  "organizer_id": "required",
  "participant_ids": "allowed",
  "event_status": "allowed",
  "event_type": "allowed",
  "associated_contacts": "allowed",
  "related_goals": "allowed"
},
  schema: generateSchemaFromDefaultPredicates({
  "name": "required",
  "description": "allowed",
  "start_date": "required",
  "end_date": "allowed",
  "location": "allowed",
  "organizer_id": "required",
  "participant_ids": "allowed",
  "event_status": "allowed",
  "event_type": "allowed",
  "associated_contacts": "allowed",
  "related_goals": "allowed"
},ResourceType.ScheduledEvent),
  agentId: 'leadCalendarAgent', // Assign an agentId to the resource
};

export default ScheduledEventResource;
