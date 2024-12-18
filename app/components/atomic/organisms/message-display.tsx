// app/components/atomic/organisms/message-display.tsx

'use client';

import React from 'react';
import { SearchHit } from '@/app/types'; // Ensure correct import

interface MessageDisplayProps {
  message: SearchHit;
}

export function MessageDisplay({ message }: MessageDisplayProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{message.subject}</h2>
      <p className="mb-4">{message.content}</p>
      <div className="text-sm text-gray-500">
        <p>Status: {message.status}</p>
        <p>Type: {message.messageType}</p>
        <p>ID: {message.id}</p>
        {/* Add other fields as necessary */}
      </div>
    </div>
  );
}
