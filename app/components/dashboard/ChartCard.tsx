// components/ChartCard.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface ChartCardProps {
  triple: Triple;
}

const ChartCard: React.FC<ChartCardProps> = ({ triple }) => {
  // Chart rendering logic based on the object data
  return (
    <div className="chart-card">
      <div className="title">{triple.subject}</div>
      {/* Chart rendering logic here */}
    </div>
  );
};

export default ChartCard;
