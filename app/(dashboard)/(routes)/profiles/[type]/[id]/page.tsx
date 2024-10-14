// app/(dashboard)/(routes)/profiles/[type]/[id]/page.tsx

import React from 'react';
import getESResourceById from "@/app/actions/getESResourceById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import AthleteProfile from "@/app/components/profile/AthleteProfile";
import BrandProfile from "@/app/components/profile/BrandProfile"; // New component for brands
import { ListingProvider } from "@/app/context/ListingContext";

// Define Params interface
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

  const resource = await getESResourceById(indexName,id);

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
        {type === 'athlete' ? (
          <AthleteProfile 
            resource={resource.triples}
          />
        ) : (
          <BrandProfile 
            resource={resource.triples}
          />
        )}
      </ClientOnly>
    </ListingProvider>
  );
}

export default ListingPage;
