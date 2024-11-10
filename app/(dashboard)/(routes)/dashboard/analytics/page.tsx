"use client";

import React, { useEffect, useState } from "react";
import { Statistic } from "@/app/types";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Overview  as SankeyOverview} from "@/app//components/atomic/organisms/sankey-overview";
import { Overview as BarChartOverview } from "@/app/components/atomic/organisms/bar-chart-overview";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const AnalyticsPage: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch("/api/resource/statstics"); // Assuming resourceName 'agents' corresponds to statistics
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

  if (loading) return <p>Loading analytics data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-gradient-to-b p-8 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight ${montserrat.className}`}>
              Analytics
            </h2>
            <p className="text-muted-foreground">
              View and analyze your key statistics.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => alert("Export Analytics")}>Export</Button>
          </div>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "linear-gradient(to bottom, #0A0E27, #000000)" }}
      >
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {statistics.map((stat) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
