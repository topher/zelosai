// app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardUserActions.tsx

'use client';

import React, { useState } from 'react';
import {
  BiLike,
  BiDislike,
  BiComment,
  BiPlusCircle,
  BiLinkAlt,
  BiUserPlus,
} from 'react-icons/bi';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

interface TripleCardUserActionsProps {
  likes: number;
  dislikes: number;
  comments: number;
  onBookmark: () => void;
  onShare: () => void;
  onComment: () => void;
  onLike: () => void;
  onDislike: () => void;
  onGetLink: () => void;
}

const TripleCardUserActions: React.FC<TripleCardUserActionsProps> = ({
  likes,
  dislikes,
  comments,
  onLike,
  onDislike,
  onComment,
  onBookmark,
  onShare,
  onGetLink,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TooltipProvider>
      <div
        className={`p-4 bg-transparent ${
          isExpanded ? 'flex flex-col space-y-2' : 'flex items-center justify-between'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {!isExpanded && (
          <div className="flex items-center space-x-4 text-gray-400">
            {/* Like */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike();
                  }}
                  className="hover:text-white"
                >
                  <BiLike className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span>Like</span>
              </TooltipContent>
            </Tooltip>

            {/* Dislike */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDislike();
                  }}
                  className="hover:text-white"
                >
                  <BiDislike className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span>Dislike</span>
              </TooltipContent>
            </Tooltip>

            {/* Comment */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onComment();
                  }}
                  className="hover:text-white"
                >
                  <BiComment className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span>Comment</span>
              </TooltipContent>
            </Tooltip>

            {/* Add Content */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark();
                  }}
                  className="hover:text-white"
                >
                  <BiPlusCircle className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span>Add Content</span>
              </TooltipContent>
            </Tooltip>

            {/* Get Link */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onGetLink();
                  }}
                  className="hover:text-white"
                >
                  <BiLinkAlt className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span>Get Link</span>
              </TooltipContent>
            </Tooltip>

            {/* Share */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare();
                  }}
                  className="hover:text-white"
                >
                  <BiUserPlus className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <span>Share</span>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {isExpanded && (
          <div className="text-gray-400">
            <div>Likes: {likes}</div>
            <div>Dislikes: {dislikes}</div>
            <div>Comments: {comments}</div>
            {/* Add more counts as needed */}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default TripleCardUserActions;
