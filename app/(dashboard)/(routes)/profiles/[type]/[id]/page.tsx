// app/(dashboard)/(routes)/profiles/[type]/[id]/page.tsx

import React from 'react';
import getESResourceById from "@/app/actions/getESResourceById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "../../../search/components/EmptyState";
import Profile from '@/app/(dashboard)/(routes)/profiles/[type]/[id]/components/Profile'; // Use unified Profile component
import { ListingProvider } from "@/app/context/ListingContext";

interface Params {
  id: string;
  type: 'athlete' | 'brand';
}

interface ListingPageProps {
  params: Params;
}

const ListingPage = async ({ params }: ListingPageProps) => {
  const { id, type } = params;
  
  // Determine the index name based on type
  const indexName = type === 'athlete' ? 'athletes_triples' : 'brands_triples';

  const resource = await getESResourceById(indexName, id);

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
        <Profile resource={resource.triples} type={type} />
      </ClientOnly>
    </ListingProvider>
  );
}

export default ListingPage;
