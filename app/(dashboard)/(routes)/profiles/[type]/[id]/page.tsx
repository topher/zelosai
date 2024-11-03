import React, { useEffect, useState } from 'react';
import ClientOnly from "../../../../../../app/components/ClientOnly";
import EmptyState from "../../../search/components/EmptyState";
import Profile from "./components/Profile";
import { ListingProvider } from "../../../../../../app/context/ListingContext";
import { Triple, ResourceType } from "../../../../../../app/types";

interface Params {
  id: string;
  type: ResourceType; // Assuming 'athlete' | 'brand' is covered by ResourceType
}

interface Resource {
  id: string;
  triples: Triple[];
}

interface ListingPageProps {
  params: Params;
}

const ListingPage = ({ params }: ListingPageProps) => {
  const { id, type } = params;
  const [resource, setResource] = useState<Resource | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profiles/${type}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.error);
          return;
        }

        const data = await res.json();
        setResource(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [id, type]);

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
        <EmptyState title="Loading..." />
      </ClientOnly>
    );
  }

  return (
    <ListingProvider>
      <ClientOnly>
        <Profile resource={resource.triples} type={type} />
      </ClientOnly>
    </ListingProvider>
  );
};

export default ListingPage;
