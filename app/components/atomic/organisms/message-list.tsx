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
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        No messages found.
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg bg-white/10 backdrop-blur-md shadow-lg">
      <ul className="divide-y divide-white/20">
        {messages.map((message) => (
          <li
            key={message.objectID} // Use 'objectID' as key
            className="p-4 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
            onClick={() => onSelect(message)}
          >
            <h4 className="text-md font-semibold text-white">
              {message.subject}
            </h4>
            <p className="mt-1 text-sm text-gray-200">{message.content}</p>
            <div className="mt-2 text-xs text-gray-400">
              Status: {message.status} | Type: {message.messageType}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
