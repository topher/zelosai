'use client';

import { useRouter } from 'next/navigation';
import AccessRightsForm from '../components/rule-form';
import { Dialog, DialogContent, DialogOverlay } from '@radix-ui/react-dialog';
import { useEffect } from 'react';

const CreateRulePage = () => {
  const router = useRouter();

  // Close modal and go back to the rules page when the modal is closed
  const handleCloseModal = () => {
    router.push('/assets/rules/create-rule');
  };

  useEffect(() => {
    // Redirect to the main page if this page is accessed directly (optional)
    if (typeof window !== 'undefined' && !window.history.state?.openModal) {
      handleCloseModal();
    }
  }, []);

  return (
    <Dialog open={true} onOpenChange={handleCloseModal}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30" />
      <DialogContent className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
          <AccessRightsForm />
          <button onClick={handleCloseModal} className="mt-4 text-red-600">
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRulePage;
