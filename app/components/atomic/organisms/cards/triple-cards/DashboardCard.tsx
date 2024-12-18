// components/DashboardCard.js
import React from 'react';
import Link from 'next/link';

interface DashboardCardProps {
    title: string;
    description: string;
    action: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, action }) => {
  return (
    <div className="card bg-white shadow-lg rounded p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
      <Link className="btn mt-2" href={action}>
        Go
      </Link>
    </div>
  );
};

export default DashboardCard;
