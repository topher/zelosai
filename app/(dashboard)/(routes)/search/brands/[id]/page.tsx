// app/(dashboard)/(routes)/search/brands/[id]/page.tsx

import React from 'react';
import getESResourceById from "@/app/actions/getESResourceById";
import ClientOnly from "@/app/components/common/ClientOnly";
import EmptyState from "../../components/EmptyState";
import Profile from '@/app/(dashboard)/(routes)/profiles/[type]/[id]/components/Profile'; // Use unified Profile component
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
