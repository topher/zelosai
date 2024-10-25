// app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardPredicate.tsx

'use client';

import React, { useState } from 'react';
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
  subjectName?: string;
  type: 'athlete' | 'brand';
}

interface TripleCardProps {
  triple: Triple;
}

const TripleCardPredicate: React.FC<TripleCardProps> = ({ triple }) => {
  const { subject, subjectName, object, citation, type, predicate } = triple;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const getSubjectId = (uri: string): string => {
    const parts = uri.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2];
  };

  const subjectId = getSubjectId(subject);

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
    <div className="group bg-gray-800 hover:bg-gray-700 shadow-lg rounded-lg m-4 transform transition-transform duration-200 hover:scale-105 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow h-full">
        <Link href={`/profiles/${type}/${subjectId}`} className="h-full">
          {/* Conditionally adjust padding based on whether object text is displayed */}
          <div
            className={`transition-colors duration-200 cursor-pointer h-full flex flex-col flex-grow ${
              predicate !== 'has_social_media' ? 'p-6' : 'p-6 pb-0'
            }`}
          >
            <h3 className="text-2xl font-semibold text-white mb-2 break-words group-hover:text-gold">
              {subjectName}
            </h3>
            {/* Hide the object text if it's a social media link */}
            {predicate !== 'has_social_media' && (
              <p className="text-gray-300 flex-grow break-words">{object}</p>
            )}
            {citation && (
              <div
                className={`text-xs text-gray-500 mt-2 italic break-words ${
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
        comments={0} // Replace with actual comments count
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

export default TripleCardPredicate;
