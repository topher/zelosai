// components/OrganizationForm.tsx

import React from 'react';
import { OrganizationResource, UserResource } from '@clerk/types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { updateOrganization } from '@/lib/organization';

interface OrganizationFormProps {
  organization: OrganizationResource;
  user: UserResource | null;
}

export const OrganizationForm: React.FC<OrganizationFormProps> = ({ organization, user }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: organization.name,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await updateOrganization(organization.id, data);
      alert('Organization updated successfully.');
    } catch (error) {
      console.error('Error updating organization:', error);
      alert('Failed to update organization.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Organization Name</label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md"
        />
        {formState.errors.name && <span className="text-red-600">This field is required</span>}
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};
