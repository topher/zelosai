// app/(dashboard)/(routes)/settings/organization/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useOrganization, useUser } from '@clerk/nextjs';
import { OrganizationForm } from './components/OrganizationForm';
import { useRouter } from 'next/navigation';

export default function OrganizationSettingsPage() {
  const { organization } = useOrganization();
  const { user } = useUser();
  const router = useRouter();

  // Redirect to create organization page if no organization is selected
  useEffect(() => {
    if (!organization) {
      router.push('/create-organization');
    }
  }, [organization, router]);

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Organization</h1>
      <OrganizationForm organization={organization} user={user} />
    </div>
  );
}
