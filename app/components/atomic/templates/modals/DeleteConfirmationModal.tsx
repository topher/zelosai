// /app/components/atomic/templates/modals/DeleteConfirmationModal.tsx

"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceType: string; // e.g., "goals"
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
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/resource/${resourceType}/${resourceId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onSuccess();
        toast.success(`Successfully deleted ${resourceType.slice(0, -1)}.`);
      } else {
        const data = await response.json();
        console.error("Failed to delete:", data.message);
        toast.error(data.message || "Failed to delete.");
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>Are you sure you want to delete this {resourceType.slice(0, -1)}?</p>
        </div>
        <DialogFooter className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              handleDelete();
              onClose();
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
