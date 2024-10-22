// app/components/profile/ProfileInfo.tsx

'use client';

import React from 'react';
import { Triple, ResourceType } from '@/app/types';

interface ProfileInfoProps {
  triples: Triple[];
  type: ResourceType;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ triples, type }) => {
  // Extract specific triples based on type
  let specificTriples: Triple[] = [];

  if (type === 'athlete') {
    specificTriples = triples.filter(triple =>
      ['sport', 'occupation', 'languages_spoken'].includes(triple.predicate)
    );
  } else if (type === 'brand') {
    specificTriples = triples.filter(triple =>
      ['industry', 'founded_year', 'headquarters'].includes(triple.predicate)
    );
  }

  return (
    <div className="profile-info p-4">
      <h2 className="text-xl text-white font-semibold">Information</h2>
      <ul className="list-disc list-inside">
        {specificTriples.map((triple, index) => (
          <li key={index}>
            <strong>{triple.predicate.replace(/_/g, ' ')}:</strong> {triple.object}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileInfo;
