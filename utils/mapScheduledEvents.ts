// utils/mapScheduledEvents.ts

import { ScheduledEvent } from '@/app/types';
import { Event as BigCalendarEvent } from 'react-big-calendar';

export function mapScheduledEvents(events: ScheduledEvent[]): BigCalendarEvent[] {
  return events.map((event) => ({
    id: event.id,
    title: event.name,
    start: new Date(event.startDate),
    end: event.endDate ? new Date(event.endDate) : new Date(event.startDate),
    allDay: false, // Adjust based on your data
    desc: event.description,
    location: event.location,
    resource: event, // Pass the entire event object for custom rendering
  }));
}
