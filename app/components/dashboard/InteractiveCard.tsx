// components/InteractiveCard.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface InteractiveCardProps {
  triple: Triple;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ triple }) => {
  // Interactive action logic
  return (
    <div className="interactive-card">
      <div className="title">{triple.subject}</div>
      <button onClick={() => { /* Action logic here */ }}>{triple.object}</button>
    </div>
  );
};

export default InteractiveCard;
