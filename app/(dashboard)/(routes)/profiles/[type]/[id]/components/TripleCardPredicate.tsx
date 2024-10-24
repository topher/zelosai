// app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardPredicate.tsx

'use client';

import React, { useState } from 'react';
import TripleCardUserActions from './TripleCardUserActions';
import Link from 'next/link';

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
  const { subject, subjectName, object, citation, type } = triple;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const getSubjectId = (uri: string): string => {
    const parts = uri.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2];
  };

  // Keep your getURISuffix function
  const getURISuffix = (uri: string) => {
    const parts = uri.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2];
  };

  const subjectId = getSubjectId(subject);

  // Capitalize object text
  const displayObject = object.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="group bg-gray-800 hover:bg-gray-700 shadow-lg rounded-lg overflow-hidden m-4 transform transition-transform duration-200 hover:scale-105 flex flex-col">
      <Link href={`/profiles/${type}/${subjectId}`} className="flex-grow h-full">
        <div className="p-6 transition-colors duration-200 cursor-pointer h-full flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold text-white mb-2">{subjectName}</h3>
          <p className="text-gray-300 flex-grow">{displayObject}</p>
          {citation && <div className="text-xs text-gray-500 mt-2 italic">{citation}</div>}
        </div>
      </Link>

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
