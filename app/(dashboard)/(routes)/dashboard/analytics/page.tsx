// /app/(dashboard)/(routes)/dashboard/analytics/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { Statistic } from "@/app/types";
import { Button } from "@/components/ui/button";
import HomeDashboardLayout from "@/app/components/atomic/templates/HomeDashboardLayout";
import StatisticCard from "@/app/components/atomic/molecules/cards/StatisticCard";

const AnalyticsPage: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([
    {
      id: "1",
      title: "Daily Visitors",
      description: "Number of unique visitors today",
      value: "1,245",
      tags: ["Growth", "Engagement"],
    },
    {
      id: "2",
      title: "Total Revenue",
      description: "Revenue generated this month",
      value: "$12,840",
      tags: ["Profit", "Sales"],
    },
    {
      id: "3",
      title: "Bounce Rate",
      description: "Percentage of visitors who left quickly",
      value: "35%",
      tags: ["Performance", "Metrics"],
    },
  ]);
  const [loading, setLoading] = useState(false); // No loading when using dummy data
  const [error, setError] = useState<string | null>(null);

  return (
    <HomeDashboardLayout
      header={{
        title: "Analytics",
        description: "View and analyze your key statistics.",
        actions: (
          <Button onClick={() => alert("Export Analytics")}>Export</Button>
        ),
      }}
      isLoading={loading}
      error={error}
      items={statistics}
      renderItem={(stat) => <StatisticCard key={stat.id} statistic={stat} />}
    />
  );
};


export default AnalyticsPage;
