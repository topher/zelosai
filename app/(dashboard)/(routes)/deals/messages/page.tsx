// app/(dashboard)/(routes)/deals/messages/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { createCustomSearchClient } from '@/lib/customSearchClient';
import ThreePanelTemplate from '@/app/components/atomic/ttemplates/ThreePanelTemplate';
import { MessageCatalog } from '@/app/components/atomic/organisms/MessageCatalog';
import { useAuth } from '@clerk/nextjs';
import { Message } from '@/app/types';

export default function MessagesPage() {
  const { userId, orgId } = useAuth();
  const [searchClient, setSearchClient] = useState<any>(null);

  // Initialize state
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [messageTypeFilter, setMessageTypeFilter] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handler for selecting a message
  const handleSelectMessage = (message: Message | null) => {
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
      <ThreePanelTemplate
        leftPanel={leftPanel}
        centerPanel={centerPanel}
        rightPanel={rightPanel}
      />
    </InstantSearch>
  );
}
