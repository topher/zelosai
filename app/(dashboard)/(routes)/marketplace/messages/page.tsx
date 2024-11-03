// app/(dashboard)/(routes)/marketplace/messages/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { createCustomSearchClient } from '@/lib/customSearchClient';
import { MessageCatalog } from './components/message-catalog';
import { useAuth } from '@clerk/nextjs';

export default function MessagesPage() {
  const { userId, orgId } = useAuth();
  const [searchClient, setSearchClient] = useState<any>(null);

  useEffect(() => {
    if (userId && orgId) {
      const client = createCustomSearchClient(userId, orgId);
      setSearchClient(client);
    }
  }, [userId, orgId]);

  if (!searchClient) {
    return <div>Loading...</div>;
  }

  return (
    <InstantSearch indexName="messages" searchClient={searchClient}>
      <Configure hitsPerPage={15} />
      <MessageCatalog />
    </InstantSearch>
  );
}
