// app/components/profile/TripleCardObject.tsx

import React, { useState, useEffect } from 'react';
import TripleCardUserActions from './TripleCardUserActions';
import Link from 'next/link';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface TripleCardObjectProps {
  triple: Triple;
}

const TripleCardObject: React.FC<TripleCardObjectProps> = ({ triple }) => {
  const { subject, predicate, object, citation } = triple;

  // State for like/dislike
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // Extract 'type' from 'subject' URI
  const getTypeFromSubject = (subjectUri: string): 'athlete' | 'brand' => {
    const uriParts = subjectUri.split('/');
    const typeIndex = uriParts.findIndex((part) => part === 'knowledge') + 1;
    const type = uriParts[typeIndex] as 'athlete' | 'brand';
    return type;
  };

  const type = getTypeFromSubject(subject);

  // Randomly decide on card style
  const [isGradientStyle, setIsGradientStyle] = useState<boolean>(false);

  useEffect(() => {
    setIsGradientStyle(Math.random() >= 0.5); // 50% chance for gradient style
  }, []);

  const randomHeight = Math.floor(Math.random() * 150) + 150;

  const plainCardStyles =
    'group bg-white/20 backdrop-blur-lg shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-white/30';

  const gradientCardStyles =
    'group bg-gradient-to-br from-indigo to-blue text-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105 hover:from-blue hover:to-indigo-light';

  // Choose the style based on the random selection
  const cardStyles = isGradientStyle ? gradientCardStyles : plainCardStyles;

  return (
    <Link href={`/search/predicates/${type}/${predicate}`} passHref>
      <div
        className={cardStyles}
        style={{ height: `${randomHeight}px`, padding: '16px' }}
      >
        {/* Card Content */}
        <div className="content">
          <p
            className={`
              object-text text-xl text-white font-semibold transition-colors duration-300 
              truncate ${
                isGradientStyle
                  ? 'group-hover:text-darkGray'
                  : 'group-hover:text-gold'
              }
            `}
          >
            {object}
          </p>
          <p className="predicate-text text-white/60 text-sm capitalize mt-2">
            {predicate.replace(/_/g, ' ')}
          </p>
          {citation && (
            <div className="citation-text text-white/40 text-xs italic mt-4">
              {citation}
            </div>
          )}
        </div>

        {/* User Actions */}
        <TripleCardUserActions
          likes={likes}
          dislikes={dislikes}
          onLike={() => setLikes(likes + 1)}
          onDislike={() => setDislikes(dislikes + 1)}
          comments={0}
          onBookmark={() => {}}
          onShare={() => {}}
          onComment={() => {}}
          onGetLink={() => {}}
        />
      </div>
    </Link>
  );
};

export default TripleCardObject;
