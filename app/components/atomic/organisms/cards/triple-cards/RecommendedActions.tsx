// components/RecommendedActions.tsx
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface RecommendedActionsProps {
  triples: Triple[];
}

const RecommendedActions: React.FC<RecommendedActionsProps> = ({ triples }) => {
  console.log(triples,"RecommendedActions triples")
  return (
    <aside className="recommended-actions">
      {triples.map((triple, index) => (
        <div key={index} className="action-item">{triple.subject}</div>
      ))}
    </aside>
  );
};

export default RecommendedActions;
