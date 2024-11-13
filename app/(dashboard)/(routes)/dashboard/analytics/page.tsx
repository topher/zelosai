// /app/(dashboard)/(routes)/dashboard/analytics/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Statistic } from "@/app/types";
import { Button } from "@/components/ui/button";
import HomeDashboardLayout from "@/app/components/atomic/templates/HomeDashboardLayout";
import StatisticCard from "./components/StatisticCard";

const AnalyticsPage: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("/api/resource/statistics"); // Adjust the API endpoint as needed
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
      renderItem={(stat) => <StatisticCard key={stat.id} statistic={stat} />}
    />
  );
};

export default AnalyticsPage;
