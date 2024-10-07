// app/(dashboard)/(routes)/search/brands/[id]/page.tsx

import React from 'react';
import getESResourceById from "@/app/actions/getESResourceById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import BrandProfile from "@/app/components/profile/AthleteProfile"; // Consider renaming to BrandProfile if more appropriate
import { ListingProvider } from "@/app/context/ListingContext";

interface Params {
  id: string;
}

const ListingPage = async ({ params }: { params: Params }) => {
  const { id } = params;

  const resource = await getESResourceById("brand_triples",id);

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
        <BrandProfile 
          resource={resource.triples}
        />
      </ClientOnly>
    </ListingProvider>
  );
}

export default ListingPage;
