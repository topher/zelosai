// /app/profiles/[profileType]/[profileId]/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import ClientOnly from "../../../../../components/common/ClientOnly";
import EmptyState from "../../../search/components/EmptyState";
import Profile from "./components/Profile";
import { ListingProvider } from "../../../../../context/ListingContext";
import { Triple, ProfileType, Resource, Profile as SubjectProfileType } from "@/app/types";

interface Params {
  profileType: ProfileType; // e.g., 'user', 'athlete', 'brand'
  profileId: string;
}

interface ListingPageProps {
  params: Params;
}

const ListingPage = ({ params }: ListingPageProps) => {
  const { profileType, profileId } = params;
  const [resource, setResource] = useState<SubjectProfileType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Construct the resourceName based on profileType
        const resourceName = `${profileType}s_triples`; // e.g., 'user_triples', 'athlete_triples', 'brand_triples'

        const res = await fetch(`/api/resource/${resourceName}/${profileId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.message || 'Failed to fetch profile.');
          return;
        }

        const data: SubjectProfileType = await res.json();
        console.log('Profile Data:', data);
        setResource(data);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileType, profileId]);

  if (loading) {
    return (
      <ClientOnly>
        <EmptyState title="Loading..." />
      </ClientOnly>
    );
  }

  if (error) {
    return (
      <ClientOnly>
        <EmptyState title="Error" subtitle={error} />
      </ClientOnly>
    );
  }

  if (!resource) {
    return (
      <ClientOnly>
        <EmptyState title="No Resource Found" subtitle="The requested resource does not exist." />
      </ClientOnly>
    );
  }

  return (
    <ListingProvider>
      <ClientOnly>
        <Profile triples={resource.triples} profileId={profileId} profileType={profileType} />
      </ClientOnly>
    </ListingProvider>
  );
};

export default ListingPage;
