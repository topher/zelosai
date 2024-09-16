// components/LabelCard.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface LabelCardProps {
  triple: Triple;
}

const LabelCard: React.FC<LabelCardProps> = ({ triple }) => {
  // Assuming object is comma-separated labels
  const labels = triple.object.split(',');

  return (
    <div className="label-card">
      {labels.map((label, index) => (
        <span key={index} className="label">
          {label}
        </span>
      ))}
    </div>
  );
};

export default LabelCard;
