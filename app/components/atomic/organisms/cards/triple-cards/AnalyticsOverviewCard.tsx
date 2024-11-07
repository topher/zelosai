// components/AnalyticsOverviewCard.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface AnalyticsOverviewCardProps {
  triple: Triple;
}

const AnalyticsOverviewCard: React.FC<AnalyticsOverviewCardProps> = ({ triple }) => {
  // Analytics overview logic
  return (
    <div className="analytics-overview-card">
      <div className="title">{triple.subject}</div>
      {/* Analytics data rendering logic here */}
    </div>
  );
};

export default AnalyticsOverviewCard;
