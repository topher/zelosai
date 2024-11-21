// components/modals/DeleteConfirmationModal.tsx

"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from "react-hot-toast";
import { Trash } from 'lucide-react';

export interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: string;
  resourceId: string;
  onSuccess: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  resourceType,
  resourceId,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const response = await fetch(`/api/resource/${resourceType}/${resourceId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`${resourceType} deleted successfully.`);
        onSuccess();
        onClose();
      } else {
        throw new Error(result.message || 'Failed to delete the resource.');
      }
    } catch (error: any) {
      console.error('DeleteConfirmationModal Error:', error);
      setApiError(error.message || 'An unexpected error occurred.');
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-red-600">Confirm Deletion</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          {apiError && <p className="text-red-500 mb-4">{apiError}</p>}
          <p className="text-gray-700">
            Are you sure you want to delete this {resourceType}? This action cannot be undone.
          </p>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            {loading ? 'Deleting...' : <>
              <Trash className="h-4 w-4" />
              <span>Delete</span>
            </>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
