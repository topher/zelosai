// app/components/profile/Profile.tsx

import React, { useState, useEffect } from 'react';
import ProfileHead from './ProfileHead';
import ProfileUserActions from './ProfileUserActions';
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

  // Retrieve nameTriple from the original resource before filtering
  const nameTriple = resource.find((triple) => triple.predicate === 'has_name');

  return (
    <div className={`${type}-profile`}>
      {/* Header */}
      <div className="p-8">
        <ProfileHead
          name={nameTriple?.object || 'Name Unavailable'}
          imageSrc="/placeholder_avatar.png"
        />
      </div>

      {/* Highlight Cards */}
      <div className="p-8">
        <ProfileHighlightCards
          data={
            type === 'athlete'
              ? triples.find((triple) => triple.predicate === 'sport')
              : triples.find((triple) => triple.predicate === 'industry')
          }
        />
      </div>

      {/* User Actions */}
      <div className="my-6">
        <ProfileUserActions type={type} />
      </div>

      {/* Mosaic Grid */}
      <ProfileGrid triples={triples} gridClassName="my-masonry-grid" />
    </div>
  );
};

export default Profile;
