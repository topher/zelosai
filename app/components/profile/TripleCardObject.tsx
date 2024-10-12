import React, { useState, useEffect } from 'react';
import TripleCardUserActions from './TripleCardUserActions';
import Link from 'next/link';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
  // Removed 'type' from the interface as we'll derive it from 'subject'
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
    console.log(subjectUri)
    const uriParts = subjectUri.split('/');
    // Assuming the type is always at the 4th index after splitting
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

  // Define the two styles
  const plainCardStyles =
    'group bg-white bg-opacity-20 backdrop-blur-lg shadow-md rounded-lg overflow-hidden p-6 transition-all duration-300 hover:shadow-xl';

  const gradientCardStyles =
    'group bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md rounded-lg overflow-hidden p-6 transition-all duration-300 hover:shadow-xl hover:from-purple-600 hover:to-pink-600';

  // Choose a random style
  const cardStyles = isGradientStyle ? gradientCardStyles : plainCardStyles;

  return (
    <Link href={`/search/profiles/predicates/${type}/${predicate}`} passHref>
      <div className={cardStyles}>
        {/* Card Content */}
        <div className="content">
          <p
            className={`
              object-text text-xl font-semibold transition-colors duration-300 
              truncate ${
                isGradientStyle
                  ? 'text-white group-hover:text-blue-800'
                  : 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500'
              }
            `}
          >
            {object}
          </p>
          <p className="predicate-text text-gray-400 text-sm capitalize mt-2">
            {predicate.replace(/_/g, ' ')}
          </p>
          {citation && (
            <div className="citation-text text-gray-300 text-xs italic mt-4">
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
