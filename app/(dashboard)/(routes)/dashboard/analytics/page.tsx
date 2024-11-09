// /app/(dashboard)/(routes)/dashboard/analytics/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Statistic } from "@/app/types";
import { Button } from "@/components/ui/button";
import HomeDashboardLayout from "@/app/components/atomic/templates/HomeDashboardLayout";

const AnalyticsPage: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("/api/resource/agents"); // Adjust the API endpoint as needed
        if (response.ok) {
          const data = await response.json();
          setStatistics(data.resources);
        } else {
          setError("Failed to load analytics data.");
        }
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const isLoading = loading;

  return (
    <HomeDashboardLayout
      header={{
        title: "Analytics",
        description: "View and analyze your key statistics.",
        actions: (
          <Button onClick={() => alert("Export Analytics")}>Export</Button>
        ),
      }}
      isLoading={isLoading}
      error={error}
      items={statistics}
      renderItem={(stat) => (
        <div key={stat.id} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">{stat.title}</h3>
          <p className="text-2xl">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {stat.tags.map((tag, idx) => (
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

export default AnalyticsPage;
