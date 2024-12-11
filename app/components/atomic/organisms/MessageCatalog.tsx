// app/components/atomic/organisms/MessageCatalog.tsx

'use client';

import React from 'react';
import { connectHits, SearchBox } from 'react-instantsearch-dom';
import { MessageList } from './message-list';
import { MessageDisplay } from './message-display';
import { StatusNav } from '../molecules/StatusNav';
import { MessageTypeNav } from '../molecules/MessageTypeNav';
import { Separator } from '@/components/ui/separator';
import { SearchHit } from '@/app/types';

interface MessageCatalogProps {
  selectedMessage: SearchHit | null;
  onSelectMessage: (message: SearchHit | null) => void;
  query: string;
  setQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  messageTypeFilter: string;
  setMessageTypeFilter: (type: string) => void;
  loading: boolean;
  error: string | null;
}

export function MessageCatalog({
  selectedMessage,
  onSelectMessage,
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
  messageTypeFilter,
  setMessageTypeFilter,
  loading,
  error,
}: MessageCatalogProps) {
  const leftPanel = (
    <div className="p-4 text-white">
      <StatusNav selectedStatus={statusFilter} onStatusChange={setStatusFilter} />
      <Separator className="my-4" />
      <MessageTypeNav selectedType={messageTypeFilter} onTypeChange={setMessageTypeFilter} />
      <Separator className="my-4" />
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => {
          setStatusFilter('');
          setMessageTypeFilter('');
          setQuery('');
        }}
      >
        Clear Filters
      </button>
    </div>
  );

  // Define CustomHits inside the component to have access to onSelectMessage
  const CustomHits = connectHits<SearchHit[]>(({ hits }: { hits: SearchHit[] }) => {
    console.log('Hits in CustomHits:', hits);
    return <MessageList messages={hits} onSelect={onSelectMessage} />;
  });

  const centerPanel = (
    <div className="p-4 text-white">
      <SearchBox />
      {loading && <div>Loading messages...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && <CustomHits />}
    </div>
  );

  const rightPanel = (
    <div className="p-4 text-white">
      {selectedMessage ? (
        <MessageDisplay message={selectedMessage} />
      ) : (
        <div>Select a message to view details.</div>
      )}
    </div>
  );

  return { leftPanel, centerPanel, rightPanel };
}
