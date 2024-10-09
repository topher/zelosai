// app/components/profile/AthleteProfile.tsx

'use client';

import React, { useState, useEffect } from 'react';
import TripleCardPredicate from './TripleCardPredicate';
import TripleCardObject from './TripleCardObject';
import TripleCardSubject from './TripleCardSubject';
import ProfileHead from './ProfileHead';
import AthleteInfo from './ProfileInfo';
import CollaborationRequest from './CollaborationRequest';
import ProfileUserActions from './ProfileUserActions';
import ProfileHighlightCards from './ProfileHighlightCards';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface AthleteProfileProps {
  resource: Triple[];
}

const AthleteProfile: React.FC<AthleteProfileProps> = ({ resource }) => {
  console.log("lezzzgo");

  const [triples, setTriples] = useState<Triple[]>([]);

  useEffect(() => {
    // Filter out "ATHLETE" and "URL" predicates
    const filteredTriples = resource.filter(
      (triple) => triple.predicate !== 'ATHLETE' && triple.predicate !== 'URL'
    );
    setTriples(filteredTriples);
  }, [resource]);

  const nameTriple = triples.find((triple) => triple.predicate === 'has_name');

  return (
    <div className="athlete-profile bg-gradient-to-r from-dark-blue to-midnight-blue p-8">
      {/* Always render ProfileHead */}
      <header>
        <ProfileHead
          name={nameTriple?.object || 'Name Unavailable'}
          imageSrc="/placeholder_avatar.png" // Ensure this path is correct
          // hdriPath="/sepulchral_chapel_rotunda_4k.hdr" // Ensure this path is correct
        />
      </header>

      {/* Highlight Cards */}
      <ProfileHighlightCards
        athlete={triples[3]} // Ensure triples[3] exists and is the correct data
      />

      {/* User Actions */}
      <div style={{ minHeight: '100px' /* Adjust as needed */ }}>
        <ProfileUserActions />
      </div>

      {/* Triples Display using react-masonry-css */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {triples.map((triple, index) => (
          <TripleCardObject key={index} triple={triple} />
        ))}
      </div>
    </div>
  );
};

export default AthleteProfile;
