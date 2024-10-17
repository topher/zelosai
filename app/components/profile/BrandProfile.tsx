// app/components/profile/BrandProfile.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import TripleCardObject from './TripleCardObject';
import ProfileHead from './ProfileHead';
import ProfileUserActions from './ProfileUserActions';
import './Profile.css';
import Masonry from 'masonry-layout';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface BrandProfileProps {
  resource: Triple[];
}

const BrandProfile: React.FC<BrandProfileProps> = ({ resource }) => {
  const [triples, setTriples] = useState<Triple[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filteredTriples = resource.filter(
      (triple) => triple.predicate !== 'has_name' && triple.predicate !== 'URL'
    );
    setTriples(filteredTriples);
  }, [resource]);

  const nameTriple = resource.find((triple) => triple.predicate === 'has_name');
  const imageTriple = resource.find((triple) => triple.predicate === 'has_wiki_logo_url');

  const imageSrc = imageTriple?.object || '/brand_avatar.png';

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
    <div className="brand-profile bg-offWhite p-8">
      <header>
        <ProfileHead
          name={nameTriple?.object || 'Unnamed Brand'}
          imageSrc={imageSrc}
        />
      </header>

      <div style={{ minHeight: '100px' }}>
        <ProfileUserActions type="brand" />
      </div>

      {/* Triples Display using Masonry */}
      <div className="brand-masonry-grid" ref={gridRef}>
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

export default BrandProfile;
