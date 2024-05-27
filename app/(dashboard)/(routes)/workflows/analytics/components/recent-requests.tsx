import React from 'react';
import { UserAction } from '@/app/types';
import { user_activity } from '@/app/data';

function RecentActivityItem({ action, content, name, timestamp }: UserAction) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex-shrink-0">
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </div>
      <div className="flex flex-col flex-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-sm">{action}</p>
        <p className="text-sm">{content}</p>
      </div>
      <p className="text-xs text-gray-500">{timestamp}</p>
    </div>
  );
}

export function RecentSales() {
  return (
    <div className="space-y-8">
      {user_activity.map((action) => (
        <RecentActivityItem key={action.name} {...action} />
      ))}
    </div>
  );
}
