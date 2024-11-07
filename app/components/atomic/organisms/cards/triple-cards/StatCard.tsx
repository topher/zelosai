// components/StatCard.tsx
"use client"
import React from 'react';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface StatCardProps {
  triple: Triple;
}

const StatCard: React.FC<StatCardProps> = ({ triple }) => {
  return (
    <div className="stat-card">
      <div className="title">{triple.subject}</div>
      <div className="value">{triple.object}</div>
    </div>
  );
};

export default StatCard;
