// app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardObject.tsx

'use client';

import React, { useState, useEffect } from 'react';
import TripleCardUserActions from './TripleCardUserActions';
import Link from 'next/link';
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
} from 'react-icons/fa';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'; // Adjust the import path as needed

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

  const plainCardStyles =
    'group bg-white/20 backdrop-blur-lg shadow-md rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-white/30';

  const gradientCardStyles =
    'group bg-gradient-to-br from-indigo to-blue text-white shadow-md rounded-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 hover:from-blue hover:to-indigo-light';

  const cardStyles = isGradientStyle ? gradientCardStyles : plainCardStyles;

  // Function to get social media icon with hover effect
  const getSocialMediaIcon = (url: string) => {
    const baseClass =
      'h-20 w-20 text-white cursor-pointer transition-colors duration-200';
    if (url.includes('twitter.com')) {
      return <FaTwitter className={`${baseClass} hover:text-blue-400`} />;
    } else if (url.includes('instagram.com')) {
      return <FaInstagram className={`${baseClass} hover:text-pink-500`} />;
    } else if (url.includes('facebook.com')) {
      return <FaFacebook className={`${baseClass} hover:text-blue-600`} />;
    } else if (url.includes('linkedin.com')) {
      return <FaLinkedin className={`${baseClass} hover:text-blue-700`} />;
    } else if (url.includes('youtube.com')) {
      return <FaYoutube className={`${baseClass} hover:text-red-600`} />;
    } else if (url.includes('tiktok.com')) {
      return <FaTiktok className={`${baseClass} hover:text-black`} />;
    } else if (url.includes('snapchat.com')) {
      return <FaSnapchat className={`${baseClass} hover:text-yellow-500`} />;
    }
    return null;
  };

  const socialMediaIcon =
    predicate === 'has_social_media' ? getSocialMediaIcon(object) : null;

  return (
    <div className={`${cardStyles} flex flex-col`}>
      {/* Main Content */}
      <div className="flex-grow">
        <Link href={`/search/predicates/${type}/${predicate}`} passHref>
          {/* Conditionally adjust padding based on whether object text is displayed */}
          <div
            className={`content flex-grow cursor-pointer ${
              predicate !== 'has_social_media' ? 'p-4' : 'pl-4 pt-2'
            }`}
          >
            {/* Hide the object text if it's a social media link */}
            {predicate !== 'has_social_media' && (
              <p
                className={`
                  object-text text-xl text-white font-semibold transition-colors duration-300 
                  ${
                    isGradientStyle
                      ? 'group-hover:text-darkGray'
                      : 'group-hover:text-gold'
                  } break-words
                `}
              >
                {object}
              </p>
            )}
            <p
              className={`predicate-text text-white/60 text-sm capitalize mt-2 break-words ${
                predicate === 'has_social_media' ? 'mt-0' : ''
              }`}
            >
              {predicate.replace(/_/g, ' ')}
            </p>
            {citation && (
              <div
                className={`citation-text text-white/40 text-xs italic mt-4 break-words ${
                  predicate === 'has_social_media' ? 'mt-0' : ''
                }`}
              >
                {citation}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Social Media Icon */}
      {socialMediaIcon && (
        <div className="p-4 flex items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={object}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {socialMediaIcon}
                </a>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-50">
                <span>{object}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* User Actions */}
      <TripleCardUserActions
        likes={likes}
        dislikes={dislikes}
        comments={0}
        onLike={() => setLikes(likes + 1)}
        onDislike={() => setDislikes(dislikes + 1)}
        onComment={() => {}}
        onBookmark={() => {}}
        onShare={() => {}}
        onGetLink={() => {}}
      />
    </div>
  );
};

export default TripleCardObject;
