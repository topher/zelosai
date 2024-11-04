// /app/(dashboard)/(routes)/profiles/[type]/[id]/components/Profile.tsx

"use client";

import React, { useState, useEffect } from 'react';
import ProfileHead from './ProfileHead';
import ProfileUserActions from './ProfileUserActions';
import ProfileInfo from './ProfileInfo';
import ProfileHighlightCards from './ProfileHighlightCards';
import ProfileGrid from './ProfileGrid';
import { Triple, ResourceType } from '@/app/types';

interface ProfileProps {
  resource: Triple[];
  type: ResourceType;
}

const Profile: React.FC<ProfileProps> = ({ resource, type }) => {
  const [triples, setTriples] = useState<Triple[]>([]);

  useEffect(() => {
    const filteredTriples = resource.filter(
      (triple) => triple.predicate !== type.toUpperCase() && triple.predicate !== 'URL'
    );
    setTriples(filteredTriples);
  }, [resource, type]);

  // Retrieve nameTriple and imageTriple from the original resource before filtering
  const nameTriple = resource.find((triple) => triple.predicate === 'has_name');
  const imageTriple = resource.find((triple) => triple.predicate === 'has_wiki_logo_url');

  // Use different placeholders for athlete and brand
  const placeholderImage = type === 'athlete' ? '/placeholder_avatar.png' : '/brand_avatar.png';
  const imageSrc = imageTriple?.object || placeholderImage; // Use placeholder if no image

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
      <ProfileUserActions type={type} />

      {/* Mosaic Grid */}
      <ProfileGrid triples={triples} gridClassName="my-masonry-grid" />
    </div>
  );
};

export default Profile;
