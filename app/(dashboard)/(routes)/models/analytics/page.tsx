"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "./components/date-range-picker";
import { Overview } from "./components/overview";
import { RecentActivties } from "@/components/recent-activity";
import { getModelAnalytics } from "@/app/actions/analyticsActions";

const accountId = "12345"; // Replace with actual account ID

export default function DashboardPage() {
  const [modelAnalytics, setModelAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getModelAnalytics(accountId);
        setModelAnalytics(data);
      } catch (err) {
        setError("Failed to load model analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading model analytics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {modelAnalytics.map((item) => (
              <Card key={item.id} className="card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title || "Untitled"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {item.subtitle || "This month"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  There were 265 actions this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivties />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
