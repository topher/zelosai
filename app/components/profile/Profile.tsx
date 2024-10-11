// app/components/profile/Profile.tsx

'use client';

import React, { useState, useEffect } from 'react';
import TripleCardObject from './TripleCardObject';
import ProfileHead from './ProfileHead';
import ProfileUserActions from './ProfileUserActions';
import ProfileHighlightCards from './ProfileHighlightCards';
import { Triple, ResourceType } from '@/app/types';
import Masonry from 'react-masonry-css';
import './Profile.css'; // Import the CSS for masonry

interface ProfileProps {
  resource: Triple[];
  type: ResourceType;
}

const Profile: React.FC<ProfileProps> = ({ resource, type }) => {
  const [triples, setTriples] = useState<Triple[]>([]);

  useEffect(() => {
    let filteredTriples: Triple[] = [];

    if (type === 'athlete') {
      filteredTriples = resource.filter(
        (triple) => triple.predicate !== 'ATHLETE' && triple.predicate !== 'URL'
      );
    } else if (type === 'brand') {
      filteredTriples = resource.filter(
        (triple) => triple.predicate !== 'BRAND' && triple.predicate !== 'URL'
      );
    }

    setTriples(filteredTriples);
  }, [resource, type]);

  const nameTriple = triples.find((triple) => triple.predicate === 'has_name');

  // Define responsive breakpoints for Masonry
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  return (
    <div className={`${type}-profile bg-gray-50 p-8`}>
      {/* Header */}
        <ProfileHead
          name={nameTriple?.object || 'Name Unavailable'}
          imageSrc="/placeholder_avatar.png"
        />

      {/* Highlight Cards */}
      <ProfileHighlightCards
        data={
          type === 'athlete'
            ? triples.find((triple) => triple.predicate === 'sport')
            : triples.find((triple) => triple.predicate === 'industry')
        }
      />

      {/* User Actions */}
      <div className="my-6">
        <ProfileUserActions />
      </div>

      {/* Triples Display using react-masonry-css */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {triples.map((triple, index) => (
          <TripleCardObject key={index} triple={triple} />
        ))}
      </Masonry>
    </div>
  );
};

export default Profile;
