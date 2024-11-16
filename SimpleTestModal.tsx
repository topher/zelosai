// SimpleTestModal.tsx
"use client";

import React from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from '@/components/ui/button';

interface SimpleTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SimpleTestModal: React.FC<SimpleTestModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded max-w-md mx-auto p-6">
          <Dialog.Title className="text-lg font-bold">Test Modal</Dialog.Title>
          <Dialog.Description className="mt-2">
            This is a test modal to verify if modals are working correctly.
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SimpleTestModal;
