// app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardSubject.tsx

'use client';

import React, { useState } from 'react';
import TripleCardUserActions from '../../../../../../components/atomic/organisms/cards/triple-cards/TripleCardUserActions';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
}

interface TripleCardSubjectProps {
  triple: Triple;
}

const TripleCardSubject: React.FC<TripleCardSubjectProps> = ({ triple }) => {
  const { subject, predicate, object, citation } = triple;

  // State for like/dislike
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  return (
    <div className="triple-card bg-white shadow-lg rounded-lg overflow-hidden p-4 m-2 relative flex flex-col">
      {/* Placeholder photo */}
      <img src="path/to/your/placeholder.jpg" alt="Placeholder" className="w-full h-32 object-cover" />

      {/* Banner */}
      <div className="banner bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 text-white">
        <h3>{predicate.replace(/_/g, ' ')}</h3>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow">
        <p className="text-gray-700 mt-1">{object}</p>
        {citation && <div className="text-xs text-gray-500 mt-2 italic">{citation}</div>}
      </div>

      {/* User actions */}
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

export default TripleCardSubject;
