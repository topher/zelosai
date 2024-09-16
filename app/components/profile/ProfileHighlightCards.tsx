// AthleteHighlightCards.jsx
import React from 'react';

const HighlightCard = ({ title, value }) => (
  <div className="highlight-card bg-white shadow rounded p-4 text-center">
    <h3 className="text-lg font-bold">{title}</h3>
    <p>{value}</p>
  </div>
);

const ProfileHighlightCards = ({ athlete }) => {
  // Example data - replace with actual data
  const highlights = [
    { title: 'Achievement', value: athlete.achievement },
    { title: 'Record', value: athlete.record },
    { title: 'Ranking', value: athlete.ranking }
  ];

  return (
    <div className="flex space-x-4 overflow-x-auto p-4">
      {highlights.map((highlight, index) => (
        <HighlightCard key={index} title={highlight.title} value={highlight.value} />
      ))}
    </div>
  );
};

export default ProfileHighlightCards;
