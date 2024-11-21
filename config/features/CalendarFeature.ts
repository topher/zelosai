import * as Yup from 'yup';
import { ResourceType } from '@/config/resourceTypes'
import { Calendar } from 'lucide-react';
import { FeatureCategory, Feature, FeatureKey, SubscriptionTier, ActionFeatureKey } from '@/config/featuresConfig';

export const calendarFeature: Feature = {
    key: FeatureKey.Calendar,
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
    actions: [
        {
            actionKey: ActionFeatureKey.ReadScheduledEvent,
            action: 'read',
            baseTier: SubscriptionTier.FREE,
            resourceLimits: [0, 50, 500],
            creditCost: 1,
        },
        {
            actionKey: ActionFeatureKey.CreateScheduledEvent,
            action: 'create',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 20, 200],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.UpdateScheduledEvent,
            action: 'update',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 20, 200],
            creditCost: 2,
        },
        {
            actionKey: ActionFeatureKey.DeleteScheduledEvent,
            action: 'delete',
            baseTier: SubscriptionTier.PRO,
            resourceLimits: [0, 10, 100],
            creditCost: 3,
        },
    ],
    metadata: {
        category: FeatureCategory.Workflows,
        icon: Calendar,
        label: 'Calendar',
        href: '/workflows/calendar',
        description: 'Schedule and manage your events.',
        isInProd: true,
        resourceName: 'scheduled_events',
        resourceType: ResourceType.ScheduledEvent,
        maxResourceCount: [0, 50, 500],
    },
};
