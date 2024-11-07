// app/components/message-catalog.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { MessageList } from './message-list';
import { MessageDisplay } from './message-display';
import { StatusNav } from './status-nav';
import { MessageTypeNav } from './message-type-nav';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  subject: string;
  content: string;
  status: string;
  messageType: string;
  // Add other relevant fields
}

export function MessageCatalog() {
  const { userId, orgId } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search and Filter States
  const [query, setQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>(''); // e.g., 'active'
  const [messageTypeFilter, setMessageTypeFilter] = useState<string>(''); // e.g., 'Text'
  
  // Pagination States
  const [page, setPage] = useState<number>(0);
  const [hitsPerPage] = useState<number>(10);
  const [nbPages, setNbPages] = useState<number>(0);
  const [totalHits, setTotalHits] = useState<number>(0);

  useEffect(() => {
    if (userId && orgId) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, orgId, query, statusFilter, messageTypeFilter, page]);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);

    // Build filters string
    let filters = '';
    if (statusFilter) {
      filters += `status:'${statusFilter}'`;
    }
    if (messageTypeFilter) {
      filters += filters ? ` AND messageType:'${messageTypeFilter}'` : `messageType:'${messageTypeFilter}'`;
    }

    try {
      const response = await fetch(`/api/resource/messages?query=${encodeURIComponent(query)}&page=${page}&hitsPerPage=${hitsPerPage}&filters=${encodeURIComponent(filters)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.resources);
        setTotalHits(data.totalHits);
        setNbPages(data.nbPages);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to load messages.');
      }
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(0); // Reset to first page on new search
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(0); // Reset to first page on filter change
  };

  const handleMessageTypeFilterChange = (type: string) => {
    setMessageTypeFilter(type);
    setPage(0); // Reset to first page on filter change
  };

  const handleClearFilters = () => {
    setStatusFilter('');
    setMessageTypeFilter('');
    setQuery('');
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < nbPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar with Navigation */}
      <div className="w-64 p-4 bg-gray-100">
        <StatusNav selectedStatus={statusFilter} onStatusChange={handleStatusFilterChange} />
        <Separator className="my-4" />
        <MessageTypeNav selectedType={messageTypeFilter} onTypeChange={handleMessageTypeFilterChange} />
        <Separator className="my-4" />
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={handleSearchInputChange}
            placeholder="Search messages..."
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Loading and Error States */}
        {loading && <div>Loading messages...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {/* Message List */}
        {!loading && !error && (
          <MessageList messages={messages} onSelect={setSelectedMessage} />
        )}

        {/* Pagination Controls */}
        {!loading && !error && nbPages > 1 && (
          <div className="mt-4 flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className={`px-3 py-1 border rounded ${page === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
            >
              Previous
            </button>
            <span>
              Page {page + 1} of {nbPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page + 1 >= nbPages}
              className={`px-3 py-1 border rounded ${page + 1 >= nbPages ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Right Panel for Message Details */}
      <div className="w-1/3 p-4 bg-gray-50">
        {selectedMessage ? (
          <MessageDisplay message={selectedMessage} />
        ) : (
          <div className="text-center text-gray-400">Select a message to view details.</div>
        )}
      </div>
    </div>
  );
}
