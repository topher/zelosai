// /app/(dashboard)/(routes)/dashboard/alerts/page.tsx

"use client";

import React, { useState } from "react";
import { Alert } from "@/app/types";
import { Button } from "@/components/ui/button";
import HomeDashboardLayout from "@/app/components/atomic/templates/HomeDashboardLayout";
import AlertCard from "@/app/components/atomic/molecules/cards/AlertCard";

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      title: "Server Downtime",
      message: "One of the servers is currently offline.",
      severity: "error",
      tags: ["Server", "Urgent"],
    },
    {
      id: "2",
      title: "New User Signups",
      message: "20 new users signed up today.",
      severity: "info",
      tags: ["Users", "Daily"],
    },
    {
      id: "3",
      title: "API Usage Warning",
      message: "You have used 85% of your API call limit.",
      severity: "warning",
      tags: ["API", "Usage"],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <HomeDashboardLayout
      header={{
        title: "Alerts",
        description: "Stay updated with the latest alerts.",
        actions: (
          <Button onClick={() => alert("Clear All Alerts")}>Clear All</Button>
        ),
      }}
      isLoading={loading}
      error={error}
      items={alerts}
      renderItem={(alertItem) => <AlertCard key={alertItem.id} alert={alertItem} />}
    />
  );
};

export default AlertsPage;
