// app/components/profile/TripleCardObject.tsx

import React, { useState } from 'react';
import TripleCardUserActions from './TripleCardUserActions';

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
  const { predicate, object, citation } = triple;

  // State for like/dislike
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // Handlers for actions
  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  const cardStyles =
    'group bg-white bg-opacity-20 backdrop-blur-lg shadow-md rounded-lg overflow-hidden p-6 transition-all duration-300 hover:shadow-xl';

  return (
    <div className={cardStyles}>
      {/* Card Content */}
      <div className="content">
        <p
          className="
            object-text text-gray-200 text-xl font-semibold 
            transition-colors duration-300 
            group-hover:text-transparent 
            group-hover:bg-clip-text 
            group-hover:bg-gradient-to-r 
            group-hover:from-blue-400 
            group-hover:to-purple-500
          "
        >
          {object}
        </p>
        <p className="predicate-text text-gray-400 text-sm">
          {predicate.replace(/_/g, ' ')}
        </p>
        {citation && (
          <div className="citation-text text-gray-300 text-xs italic mt-1">
            {citation}
          </div>
        )}
      </div>

      {/* User Actions */}
      <TripleCardUserActions
        likes={likes}
        dislikes={dislikes}
        onLike={handleLike}
        onDislike={handleDislike}
        comments={0}
        onBookmark={() => {}}
        onShare={() => {}}
        onComment={() => {}}
        onGetLink={() => {}}
      />
    </div>
  );
};

export default TripleCardObject;
