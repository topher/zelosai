// app/components/profile/ProfileHighlightCards.tsx

'use client';

import React from 'react';
import { Triple } from '@/app/types';

interface ProfileHighlightCardsProps {
  data?: Triple;
}

const ProfileHighlightCards: React.FC<ProfileHighlightCardsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="profile-highlight-cards mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="card p-4 bg-white rounded shadow">
        <h3 className="text-lg font-semibold">{data.predicate.replace(/_/g, ' ')}</h3>
        <p>{data.object}</p>
      </div>
      {/* Add more cards as needed */}
    </div>
  );
};

export default ProfileHighlightCards;
