'use client'

import React, { useState } from 'react';
import { BiLike, BiDislike, BiComment, BiPlusCircle, BiLinkAlt, BiUserPlus } from 'react-icons/bi';

interface TripleCardUserActionsProps {
    likes: number;
    dislikes: number;
    comments: number; // Additional counts
    onBookmark: () => void;
    onShare: () => void;
    onComment: () => void;
    onLike: () => void;
    onDislike: () => void;
    onGetLink: () => void;
    // ... other handlers
  }
const TripleCardUserActions: React.FC<TripleCardUserActionsProps> = ({ likes, dislikes, onLike, onDislike, onComment, onShare, onBookmark, onGetLink}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`user-actions ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
      {!isExpanded && (
        <>
        <BiLike className="icon" onClick={onLike} />
        <BiDislike className="icon" onClick={onDislike} />
        <BiComment className="icon" onClick={onComment} />
        <BiPlusCircle className="icon" onClick={onBookmark} />
        <BiLinkAlt className="icon" onClick={onGetLink} />
        <BiUserPlus className="icon" onClick={onShare} />
        {/* ... add other icons as needed */}
      </>
      )}

        {isExpanded && (
        <div className="counts-info">
            <div>Likes: {likes}</div>
            <div>Dislikes: {dislikes}</div>
            <div>Comments: {/* Number of comments */}</div>
            <div>Additions: {/* Number of additions */}</div>
            <div>Links: {/* Number of links */}</div>
            <div>User Connections: {/* Number of user connections */}</div>
            {/* ... add other count information as needed */}
        </div>
        )}

    </div>
  );
};

export default TripleCardUserActions;
