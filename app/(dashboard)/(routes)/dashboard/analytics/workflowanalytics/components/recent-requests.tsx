"use client";

import React, { useState, useEffect } from "react";
import { UserAction } from "@/app/types";
import { getUserActivityByAccountId } from "@/app/actions/userActions"; // Action to fetch user activity data

// Define the RecentActivityItem component
function RecentActivityItem({ action, content, name, timestamp }: UserAction) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex-shrink-0">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
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

// Define the RecentSales component
export function RecentSales() {
  const [userActions, setUserActions] = useState<UserAction[]>([]); // State to hold the user actions
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const accountId = "12345"; // Replace with dynamic account ID if needed

  // Fetch user activity on component mount
  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const data = await getUserActivityByAccountId(accountId); // Fetch user actions
        setUserActions(data);
      } catch (err) {
        setError("Failed to load recent activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserActivity();
  }, []);

  if (loading) return <p>Loading recent activity...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-8">
      {userActions.length > 0 ? (
        userActions.map((action) => (
          <RecentActivityItem key={action.timestamp} {...action} />
        ))
      ) : (
        <p>No recent activity available.</p>
      )}
    </div>
  );
}
