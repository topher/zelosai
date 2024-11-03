// components/Calendar.tsx

'use client'; // If using Next.js 13+

import React from 'react';
import { Calendar as BigCalendar, Event as BigCalendarEvent, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import default styles
import { localizer } from '@/utils/calendarLocalizer';
import { ScheduledEvent } from '@/app/types'; // Your ScheduledEvent interface

interface CalendarProps {
  events: BigCalendarEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  return (
    <div style={{ height: '700px' }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default Calendar;
