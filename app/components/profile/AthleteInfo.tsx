import React from 'react';

interface AthleteInfoProps {
  athlete: {
    name: string;
    sport: string;
    location: string;
  };
}

const AthleteInfo: React.FC<AthleteInfoProps> = ({ athlete }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-md">{athlete.sport}</div>
      <div className="text-md">{athlete.location}</div>
    </div>
  );
};

export default AthleteInfo;
