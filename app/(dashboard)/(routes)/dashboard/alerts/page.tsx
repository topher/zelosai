"use client";

import React, { useEffect, useState } from "react";
import { Alert } from "@/app/types";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

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

  if (loading) return <p>Loading alerts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-gradient-to-b p-8 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight ${montserrat.className}`}>
              Alerts
            </h2>
            <p className="text-muted-foreground">Stay updated with the latest alerts.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => alert("Clear All Alerts")}>Clear All</Button>
          </div>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "linear-gradient(to bottom, #0A0E27, #000000)" }}
      >
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.map((alertItem) => (
              <div
                key={alertItem.id}
                className={`p-4 rounded shadow bg-${getAlertColor(alertItem.severity)}`}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function getAlertColor(severity: string) {
  switch (severity) {
    case "error":
      return "red-100";
    case "warning":
      return "yellow-100";
    case "info":
    default:
      return "blue-100";
  }
}

export default AlertsPage;
