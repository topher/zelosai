import * as Yup from 'yup';
  import { ResourceType } from '../resourceTypes';
import { predicates } from '../predicates';

export const ScheduledEventResource = {
  resourceTypeId: ResourceType.ScheduledEvent,
  schema: Yup.object().shape({
        name: Yup.string().required('Event name is required'),
        description: Yup.string(),
        startDate: Yup.date().required('Start date is required'),
        endDate: Yup.date(),
        location: Yup.string(),
        organizerId: Yup.string().required('Organizer ID is required'),
        participantIds: Yup.array().of(Yup.string()),
        eventStatus: Yup.string().oneOf(['Scheduled', 'Cancelled', 'Postponed', 'Completed']),
        eventType: Yup.string().oneOf(['Webinar', 'Meetup', 'Training', 'Conference']),
        associatedContacts: Yup.array().of(Yup.string()),
        relatedGoals: Yup.array().of(Yup.string()),
    }),
  fields: [
        { name: 'name', label: 'Event Name', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'startDate', label: 'Start Date', type: 'text', required: true },
        { name: 'endDate', label: 'End Date', type: 'text' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'organizerId', label: 'Organizer ID', type: 'text', required: true },
        { name: 'participantIds', label: 'Participant IDs', type: 'autocomplete', multiple: true },
        { name: 'eventStatus', label: 'Event Status', type: 'text' },
        { name: 'eventType', label: 'Event Type', type: 'text' },
        { name: 'associatedContacts', label: 'Associated Contacts', type: 'autocomplete', multiple: true },
        { name: 'relatedGoals', label: 'Related Goals', type: 'autocomplete', multiple: true },
    ],
  requiredPredicates: [],
  agentId: 'leadFeatureKeyCalendarAgent', // Assign an agentId to the resource
};

export default ScheduledEventResource;
