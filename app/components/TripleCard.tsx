// /app/components/triples/TripleCard.tsx

import React, { useState } from 'react';
import { Triple } from '@/app/types';
import UpdateTriplesModal from '@/app/components/atomic/ttemplates/modals/UpdateTriplesModal';

interface TripleCardProps {
  triple: Triple;
}

const TripleCard: React.FC<TripleCardProps> = ({ triple }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="triple-card bg-gray-50 shadow-sm rounded-md p-3 cursor-pointer hover:bg-gray-100"
        onClick={() => setModalOpen(true)}
      >
        <p className="text-sm"><strong>Predicate:</strong> {triple.predicate}</p>
        <p className="text-sm"><strong>Object:</strong> {triple.object}</p>
        {triple.citation && <p className="text-xs text-gray-500">Citation: {triple.citation}</p>}
      </div>

      <UpdateTriplesModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        triple={triple}
      />
    </>
  );
};

export default TripleCard;
