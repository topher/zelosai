'use client'
// TripleCard.tsx
import React, { useState } from 'react';
import { BiAward, BiLike, BiDislike, BiComment, BiPlusCircle, BiLinkAlt, BiUserPlus } from 'react-icons/bi'; // Example icons
import TripleCardUserActions from './TripleCardUserActions';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface TripleCardProps {
  triple: Triple;
}

const TripleCard: React.FC<TripleCardProps> = ({ triple }) => {
    const { subject, predicate, object, citation } = triple;
  
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
    // const title = getURISuffix(triple.subject); // Assuming triple.subject contains the URI
    return (
      <div className="triple-card bg-white shadow-lg rounded-lg overflow-hidden p-4 m-2">
        {/* Card Content */}
        <div className="p-4">
          <p className="text-lg font-semibold">{subject}</p>
          <p className="text-lg font-semibold">{predicate}</p>
          <p className="text-gray-700 mt-1">{object}</p>
          {citation && <div className="text-xs text-gray-500 mt-2 italic">{citation}</div>}
        </div>
  
        {/* User Actions */}
          {/* User Actions - Now using the UserActions component */}
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
            } }          // ... other handlers
        />
      </div>
    );
  };
  
  export default TripleCard;