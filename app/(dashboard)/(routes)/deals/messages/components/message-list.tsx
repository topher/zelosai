// app/components/message-list.tsx

'use client';

import React from 'react';

interface Message {
  id: string;
  subject: string;
  content: string;
  status: string;
  messageType: string;
  // Add other relevant fields
}

interface MessageListProps {
  messages: Message[];
  onSelect: (message: Message) => void;
}

export function MessageList({ messages, onSelect }: MessageListProps) {
  if (messages.length === 0) {
    return <div>No messages found.</div>;
  }

  return (
    <ul className="space-y-2">
      {messages.map(message => (
        <li
          key={message.id}
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
