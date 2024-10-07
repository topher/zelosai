// app/components/profile/Profile.tsx

'use client';

import React, { useState, useEffect } from 'react';
import TripleCardPredicate from './TripleCardPredicate';
import TripleCardObject from './TripleCardObject';
import TripleCardSubject from './TripleCardSubject';
import ProfileHead from './ProfileHead'; // Renamed from AthleteHead to ProfileHead
import ProfileInfo from './ProfileInfo'; // Renamed from AthleteInfo to ProfileInfo
import CollaborationRequest from './CollaborationRequest';
import ProfileUserActions from './ProfileUserActions';
import ProfileHighlightCards from './ProfileHighlightCards';
import { Triple, ResourceType } from '@/app/types';

interface ProfileProps {
  resource: Triple[];
  type: ResourceType;
}

const Profile: React.FC<ProfileProps> = ({ resource, type }) => {
  const [showName, setShowName] = useState(false);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setShowName(true); // Scrolling up
      } else {
        setShowName(false); // Scrolling down
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Filter out irrelevant triples based on type
  const [triples, setTriples] = useState<Triple[]>([]);

  useEffect(() => {
    let filteredTriples: Triple[] = [];

    if (type === 'athlete') {
      filteredTriples = resource.filter(
        triple => triple.predicate !== 'ATHLETE' && triple.predicate !== 'URL'
      );
    } else if (type === 'brand') {
      filteredTriples = resource.filter(
        triple => triple.predicate !== 'BRAND' && triple.predicate !== 'URL'
      );
    }

    setTriples(filteredTriples);
  }, [resource, type]);

  // Extract specific triples for conditional rendering
  const nameTriple = triples.find(triple => triple.predicate === 'has_name');
  const descriptionTriple = triples.find(triple => triple.predicate === 'description');
  const socialMediaTriples = triples.filter(triple => triple.predicate === 'has_social_media');

  return (
    <div className={`${type}-profile bg-gradient-to-r from-dark-blue to-midnight-blue p-8`}>
      {/* Conditional rendering of the header */}
      <header>
        {showName ? (
          <h1 className="text-2xl font-bold">{nameTriple?.object || 'Name Unavailable'}</h1>
        ) : (
          <ProfileHead
            name={nameTriple?.object || 'Name Unavailable'}
            imageSrc="/placeholder_avatar.png" // Replace with dynamic image source if available
            hdriPath="/sepulchral_chapel_rotunda_4k.exr" // Adjust as needed
          />
        )}
      </header>

      {/* Highlight Cards */}
      <ProfileHighlightCards
        // Pass relevant data based on type
        data={
          type === 'athlete'
            ? triples.find(triple => triple.predicate === 'sport') // Example
            : triples.find(triple => triple.predicate === 'industry') // Example
        }
      />

      {/* User Actions */}
      <div style={{ minHeight: '100px' /* Adjust as needed */ }}>
        <ProfileUserActions />
      </div>

      {/* Triples Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {triples.map((triple, index) => (
          <TripleCardObject key={index} triple={triple} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
