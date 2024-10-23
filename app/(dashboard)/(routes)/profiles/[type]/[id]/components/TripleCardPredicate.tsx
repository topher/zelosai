'use client'
// TripleCard.tsx
import React, { useState } from 'react';
import TripleCardUserActions from './TripleCardUserActions';
import Link from "next/link";

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
  subjectName?: string;
  type: 'athlete' | 'brand';
}

interface TripleCardProps {
  triple: Triple;
}

const TripleCard: React.FC<TripleCardProps> = ({ triple }) => {
  const { subject, subjectName, predicate, object, citation, type } = triple;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const getSubjectId = (uri: string): string => {
    const parts = uri.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2];
  };


  const subjectId = getSubjectId(subject);
  
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
    const title = subjectName // Assuming triple.subject contains the URI
    return (
      <div className="triple-card bg-white shadow-lg rounded-lg overflow-hidden p-4 m-2">
        {/* Card Content */}
        <Link href={`/profiles/${type}/${subjectId}`}>
        <div className="p-4">
          <p className="value mt-1">{object}</p>
            <h3 className="title text-lg font-semibold">{subjectName}</h3>
            {citation && <div className="text-xs text-gray-500 mt-1 italic">{citation}</div>}
            </div>
        </Link>
  
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