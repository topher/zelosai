// /app/(dashboard)/(routes)/dashboard/alerts/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Alert } from "@/app/types";
import { Button } from "@/components/ui/button";
import HomeDashboardLayout from "@/app/components/atomic/templates/HomeDashboardLayout";

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("/api/resource/alerts");
        if (response.ok) {
          const data = await response.json();
          setAlerts(data.resources);
        } else {
          setError("Failed to load alerts.");
        }
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
        setError("Failed to load alerts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const isLoading = loading;

  return (
    <HomeDashboardLayout
      header={{
        title: "Alerts",
        description: "Stay updated with the latest alerts.",
        actions: (
          <Button onClick={() => alert("Clear All Alerts")}>Clear All</Button>
        ),
      }}
      isLoading={isLoading}
      error={error}
      items={alerts}
      renderItem={(alertItem) => (
        <div
          key={alertItem.id}
          className={`p-4 rounded shadow ${getAlertColor(alertItem.severity)}`}
        >
          <h3 className="text-lg font-bold">{alertItem.title}</h3>
          <p>{alertItem.message}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {alertItem.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    />
  );
};

function getAlertColor(severity: string) {
  switch (severity) {
    case "error":
      return "bg-red-100";
    case "warning":
      return "bg-yellow-100";
    case "info":
    default:
      return "bg-blue-100";
  }
}

export default AlertsPage;
