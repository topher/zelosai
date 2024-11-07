// components/UploadIPCard.js
import React from 'react';

interface Triple {
    subject: string;
    predicate: string;
    object: string;
    citation?: string;
  }
  
const UploadIPCard: React.FC<Triple> =() => {
  // Render logic specific to the 'Upload IP' action
  return (
    <div className="upload-ip-card">
      {/* Content */}
    </div>
  );
};

export default UploadIPCard;
