// app/(dashboard)/(routes)/search/brands/[id]/page.tsx

import React from 'react';
import getESResourceById from "@/app/actions/getESResourceById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import Profile from '@/app/components/profile/Profile'; // Use unified Profile component
import { ListingProvider } from "@/app/context/ListingContext";

interface Params {
  id: string;
}

const ListingPage = async ({ params }: { params: Params }) => {
  const { id } = params;

  const resource = await getESResourceById("brands_triples", id);

  if (!resource) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ListingProvider>
      <ClientOnly>
        <Profile resource={resource.triples} type="brand" />
      </ClientOnly>
    </ListingProvider>
  );
}

export default ListingPage;
