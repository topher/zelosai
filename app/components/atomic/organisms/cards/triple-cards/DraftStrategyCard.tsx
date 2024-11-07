// components/DraftStrategyCard.js
import React from 'react';

interface Triple {
    subject: string;
    predicate: string;
    object: string;
    citation?: string;
  }  

const DraftStrategyCard:React.FC<Triple> = (triple) => {
  // Implementation for drafting monetization strategy
  return (
    <div className="card draft-strategy-card">
      <h3 className="card-title">{triple.subject}</h3>
      <p className="card-description">{triple.object}</p>
      {/* Additional UI elements go here */}
    </div>
  );
};

export default DraftStrategyCard;
