// components/ProgressCard.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface ProgressCardProps {
  triple: Triple;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ triple }) => {
  const progress = parseInt(triple.object, 10); // Assuming object can be parsed as integer

  return (
    <div className="progress-card">
      <div className="title">{triple.subject}</div>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress">{progress}%</div>
    </div>
  );
};

export default ProgressCard;
