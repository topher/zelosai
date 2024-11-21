// /app/(dashboard)/(routes)/profiles/[type]/[id]/components/Profile.tsx

"use client";

import React, { useState, useEffect } from 'react';
import ProfileHead from './ProfileHead';
import ProfileUserActions from './ProfileUserActions';
import ProfileInfo from './ProfileInfo';
import ProfileHighlightCards from './ProfileHighlightCards';
import ProfileGrid from './ProfileGrid';
import { Triple, ProfileType } from '@/app/types';

interface ProfileProps {
  triples: Triple[];
  profileType: ProfileType;
}

const Profile: React.FC<ProfileProps> = ({ triples, profileType }) => {
  const [filteredTriples, setFilteredTriples] = useState<Triple[]>([]);

  useEffect(() => {
    const filteredTriples = triples.filter(
      (triple) => triple.predicate !== profileType.toUpperCase() && triple.predicate !== 'URL'
    );
    setFilteredTriples(filteredTriples);
  }, [triples, profileType]);

  // Retrieve nameTriple and imageTriple from the original resource before filtering
  const nameTriple = triples.find((triple) => triple.predicate === 'has_name');
  const imageTriple = triples.find((triple) => triple.predicate === 'has_wiki_logo_url');

  // Use different placeholders for athlete and brand
  const placeholderImage = profileType === 'athlete' ? '/placeholder_avatar.png' : '/brand_avatar.png';
  const imageSrc = imageTriple?.object || placeholderImage; // Use placeholder if no image

  console.log(filteredTriples, "filteredTriples")
  return (
    <div className="athlete-brand-profile">
      {/* Header */}
      <div className="p-6">
        <ProfileHead
          name={nameTriple?.object || 'Name Unavailable'}
          imageSrc={imageSrc}
        />
      </div>

      {/* Highlight Cards */}
      {/* <div className="p-4">
        <ProfileHighlightCards
          data={
            type === 'athlete'
              ? triples.find((triple) => triple.predicate === 'sport')
              : triples.find((triple) => triple.predicate === 'industry')
          }
        />
      </div> */}
      
      {/* Profile Information */}
      {/* <ProfileInfo triples={triples} type={type} /> */}

      {/* User Actions */}
      <ProfileUserActions type={profileType} />

      {/* Mosaic Grid */}
      <ProfileGrid triples={filteredTriples} gridClassName="my-masonry-grid" />
    </div>
  );
};

export default Profile;
