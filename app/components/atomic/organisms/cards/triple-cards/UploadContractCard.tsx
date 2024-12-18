// components/UploadContractCard.js
import React from 'react';

interface Triple {
    subject: string;
    predicate: string;
    object: string;
    citation?: string;
  }
  
const UploadContractCard:React.FC<Triple> = (triple) => {
  // Implementation for uploading a contract
  return (
    <div className="card upload-contract-card">
      <h3 className="card-title">{triple.subject}</h3>
      <p className="card-description">{triple.object}</p>
      {/* Additional UI elements go here */}
    </div>
  );
};

export default UploadContractCard;
