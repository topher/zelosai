// app/components/status-nav.tsx

'use client';

import React from 'react';

interface StatusNavProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function StatusNav({ selectedStatus, onStatusChange }: StatusNavProps) {
  const statuses = ['active', 'archived', 'pending']; // Adjust based on your data

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Status</h3>
      <ul>
        {statuses.map(status => (
          <li key={status}>
            <button
              onClick={() => onStatusChange(status)}
              className={`w-full text-left px-2 py-1 rounded ${
                selectedStatus === status ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
