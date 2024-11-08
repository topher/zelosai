// components/CreateOrgButton.tsx

'use client';

import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { FeatureKey } from '@/config/featuresConfig';
import { Subscription } from '@/app/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface CreateOrgButtonProps {
  subscription: Subscription;
}

export default function CreateOrgButton({ subscription }: CreateOrgButtonProps) {
  const { performAction } = useFeatureAccess(subscription);
  const router = useRouter();

  const handleCreateOrg = async () => {
    const allowed = await performAction(FeatureKey.CreateOrganization, 'create');

    if (allowed.success) {
      router.push('/create-organization');
    } else {
      toast.error(allowed.message);
    }
  };

  return (
    <button
      onClick={handleCreateOrg}
      className="px-4 py-2 bg-blue-500 text-white rounded"
      disabled={!allowed}
    >
      Create Organization
    </button>
  );
}
