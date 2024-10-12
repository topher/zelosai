// app/components/profile/AthleteProfile.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import TripleCardObject from './TripleCardObject';
import ProfileHead from './ProfileHead';
import ProfileUserActions from './ProfileUserActions';
import ProfileHighlightCards from './ProfileHighlightCards';
import './Profile.css'; // Assuming you have necessary styles here
import Masonry from 'masonry-layout';


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
  const [triples, setTriples] = useState<Triple[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filteredTriples = resource.filter(
      (triple) => triple.predicate !== 'ATHLETE' && triple.predicate !== 'URL'
    );
    setTriples(filteredTriples);
  }, [resource]);

  const nameTriple = triples.find((triple) => triple.predicate === 'has_name');

  useEffect(() => {
    if (gridRef.current) {
      new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: 30,
        percentPosition: true,
      });
    }
  }, [triples]);

  return (
    <div className="athlete-profile bg-gradient-to-r from-dark-blue to-midnight-blue p-8">
      <header>
        <ProfileHead
          name={nameTriple?.object || 'Name Unavailable'}
          imageSrc="/placeholder_avatar.png"
        />
      </header>

      {/* {triples[3] && <ProfileHighlightCards triple={triples[3]} />} */}

      <div style={{ minHeight: '100px' }}>
        <ProfileUserActions />
      </div>

      {/* Triples Display using Masonry */}
      <div className="athlete-masonry-grid" ref={gridRef}>
        <div className="grid-sizer"></div>
        {triples.map((triple, index) => (
          <div className="grid-item" key={index}>
            <TripleCardObject triple={triple} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AthleteProfile;
