// app/components/atomic/organisms/message-list.tsx

'use client';

import React from 'react';
import { SearchHit } from '@/app/types'; // Ensure correct import

interface MessageListProps {
  messages: SearchHit[];
  onSelect: (message: SearchHit) => void;
}

export function MessageList({ messages, onSelect }: MessageListProps) {
  console.log('Messages in MessageList:', messages); // Debugging

  if (messages.length === 0) {
    return <div>No messages found.</div>;
  }

  return (
    <ul className="space-y-2">
      {messages.map((message) => (
        <li
          key={message.objectID} // Use 'objectID' as key
          className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
          onClick={() => onSelect(message)}
        >
          <h4 className="text-md font-semibold">{message.subject}</h4>
          <p className="text-sm text-gray-600">{message.content}</p>
          <div className="text-xs text-gray-500">
            Status: {message.status} | Type: {message.messageType}
          </div>
        </li>
      ))}
    </ul>
  );
}
