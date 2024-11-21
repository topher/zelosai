// /app/components/atomic/templates/modals/UpdateTriplesModal.tsx

"use client";

import React from 'react';
import { Triple } from '@/app/types';
import DynamicResourceModal from '@/app/components/atomic/ttemplates/modals/DynamicResourceModal';
import { ResourceType } from '@/config/resourceTypes';

interface UpdateTriplesModalProps {
  isOpen: boolean;
  onClose: () => void;
  triple: Triple;
}

const UpdateTriplesModal: React.FC<UpdateTriplesModalProps> = ({ isOpen, onClose, triple }) => {
  const handleSuccess = (updatedTriple: Triple) => {
    // Implement any state updates or notifications as needed
    console.log('Triple updated successfully:', updatedTriple);
    // Optionally, refresh the ProfileGrid or specific sections
  };

  return (
    <DynamicResourceModal
      isOpen={isOpen}
      onClose={onClose}
      resourceType={ResourceType.Triple}
      action="update"
      resourceId={triple.id}
      initialData={triple}
      onSuccess={handleSuccess}
    />
  );
};

export default UpdateTriplesModal;
