// TripleCardObject.tsx
import React, { useState } from 'react';
import { BiLike, BiDislike, BiComment, BiPlusCircle, BiLinkAlt, BiUserPlus } from 'react-icons/bi'; // Example icons
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
  const handleLike = () => {
    // Implement your logic for liking
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    // Implement your logic for disliking
    setDislikes(dislikes + 1);
  };

  // ... Handlers for comment, add content, collab request, and find similar

  const getURISuffix = (uri: string) => {
    const parts = uri.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2];
  };
  
  // Use this function in your component to set the title.
  const title = getURISuffix(triple.subject); // Assuming triple.subject contains the URI
  return (
    <div className="triple-card bg-white shadow-lg rounded-lg overflow-hidden p-4 m-2">
      {/* Card Content */}
      <div className="content">
        <p className="object-text text-gray-800 text-xl font-semibold">{object}</p>
        <p className="predicate-text text-gray-600 text-sm">{predicate.replace(/_/g, ' ')}</p>
        {citation && <div className="citation-text text-gray-500 text-xs italic mt-1">{citation}</div>}
      </div>

      {/* User Actions */}
        <TripleCardUserActions
              likes={likes}
              dislikes={dislikes}
              onLike={handleLike}
              onDislike={handleDislike} 
              comments={0} 
              onBookmark={function (): void {
                  throw new Error('Function not implemented.');
              } } 
              onShare={function (): void {
                  throw new Error('Function not implemented.');
              } } 
              onComment={function (): void {
                  throw new Error('Function not implemented.');
              } } 
              onGetLink={function (): void {
                  throw new Error('Function not implemented.');
              } }                // ... pass other handlers as props
            />
    </div>
  );
};

export default TripleCardObject;
