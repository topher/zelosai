// ListingPage.js
import React from 'react';
import getResourceById from "@/app/actions/getResourceById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import AthleteProfile from "@/app/components/profile/AthleteProfile"; // Update this component to handle generic resources
import { ListingProvider } from "@/app/context/ListingContext";

// page.tsx
interface Params {
  id: string;
}


const ListingPage = async ({ params }: { params: Params }) => {
  const { id } = params;
  const resource = await getResourceById(id);

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
        <AthleteProfile 
          resource={resource.triples}
        />
      </ClientOnly>
    </ListingProvider>
  );
}

export default ListingPage;
