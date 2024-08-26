// components/NotificationCard.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface NotificationCardProps {
  triple: Triple;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ triple }) => {
  // Notification logic
  return (
    <div className="notification-card">
      <div className="message">{triple.subject}</div>
      {/* Notification details here */}
    </div>
  );
};

export default NotificationCard;
