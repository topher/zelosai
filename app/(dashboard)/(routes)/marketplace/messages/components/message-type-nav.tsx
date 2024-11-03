// app/components/message-type-nav.tsx

'use client';

import React from 'react';

interface MessageTypeNavProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export function MessageTypeNav({ selectedType, onTypeChange }: MessageTypeNavProps) {
  const messageTypes = ['Text', 'Email', 'Notification']; // Adjust based on your data

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Message Type</h3>
      <ul>
        {messageTypes.map(type => (
          <li key={type}>
            <button
              onClick={() => onTypeChange(type)}
              className={`w-full text-left px-2 py-1 rounded ${
                selectedType === type ? 'bg-green-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
