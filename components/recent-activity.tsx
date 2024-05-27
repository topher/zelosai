import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { user_activity } from "@/app/data"
import { UserAction } from '@/app/types';


function RecentActivityItem({ action, content, name, timestamp }: UserAction) {
  return (
    <div className="flex items-center justify-between space-x-4">
      {/* Action icon or status indicator */}
      <div className="flex-shrink-0">
        {/* Replace the placeholder event icon with a real one */}
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Real event icon/svg code here */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </div>
      <div className="flex flex-col flex-1">
        {/* Name (replaces timestamp) */}
        <p className="text-sm font-medium">{name}</p>
        {/* Action */}
        <p className="text-sm">{action}</p>
        {/* Content */}
        <p className="text-sm">{content}</p>
      </div>
      {/* Timestamp */}
      <p className="text-xs text-gray-500">{timestamp}</p>
    </div>
  );
}



export function RecentActivties() {
  return (
    <div className="space-y-8">
      {user_activity.map((action) => (
        <RecentActivityItem key={action.name} {...action} /> // Pass data as props
      ))}
    </div>
  );
}
