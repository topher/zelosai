// app/(dashboard)/(routes)/deals/messages/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { createCustomSearchClient } from '@/lib/customSearchClient';
import ThreePanelLayout from '@/app/components/atomic/templates/ThreePanelLayout';
import { MessageCatalog } from '@/app/components/atomic/organisms/MessageCatalog';
import { useAuth } from '@clerk/nextjs';
import { SearchHit } from '@/app/types';

export default function MessagesPage() {
  const { userId, orgId } = useAuth();
  const [searchClient, setSearchClient] = useState<any>(null);

  // Initialize state
  const [selectedMessage, setSelectedMessage] = useState<SearchHit | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [messageTypeFilter, setMessageTypeFilter] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handler for selecting a message
  const handleSelectMessage = (message: SearchHit | null) => {
    setSelectedMessage(message);
  };

  useEffect(() => {
    if (userId && orgId) {
      const client = createCustomSearchClient(userId, orgId);
      setSearchClient(client);
    }
  }, [userId, orgId]);

  if (!searchClient) {
    return <div>Loading...</div>;
  }

  // Define header props
  const header = {
    title: 'Messages',
    description: 'View and manage your messages here.',
  };

  const { leftPanel, centerPanel, rightPanel } = MessageCatalog({
    selectedMessage,
    onSelectMessage: handleSelectMessage,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    messageTypeFilter,
    setMessageTypeFilter,
    loading,
    error,
  });

  return (
    <InstantSearch indexName="messages" searchClient={searchClient}>
      <Configure hitsPerPage={15} />
      <ThreePanelLayout
        header={header}
        leftPanel={leftPanel}
        centerPanel={centerPanel}
        rightPanel={rightPanel}
      />
    </InstantSearch>
  );
}
