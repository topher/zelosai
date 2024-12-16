// components/CalendarCard.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface CalendarCardProps {
  triple: Triple;
}

const CalendarCard: React.FC<CalendarCardProps> = ({ triple }) => {
  // The object would need to be processed to extract calendar events
  return (
    <div className="calendar-card">
      <div className="month">{triple.subject}</div>
      {/* Calendar rendering logic here */}
    </div>
  );
};

export default CalendarCard;
