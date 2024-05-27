"use client"
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch"; // Import switch component
import { Badge } from "@/components/ui/badge"; // Import badge component
import { goals as goalsDemoData } from "@/app/data";
import { Info } from "lucide-react"; // Import Lucide icons
import { Goal } from "@/app/types";

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>(goalsDemoData);

  // Function to toggle goal status
  const toggleGoalStatus = (index: number) => {
    setGoals(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals[index].isActive = !updatedGoals[index].isActive;
      return updatedGoals;
    });
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-medium">Goals</h3>
        <p className="text-sm text-muted-foreground">
          Describe the goals and objectives for your organization.
        </p>
      </div>
      <Separator />
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal, index) => (
          <Card key={index} className="bg-white border border-gray-200 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{goal.Goal}</CardTitle>
                <Switch checked={goal.isActive} onChange={() => toggleGoalStatus(index)} />
              </div>
            </CardHeader>
            <CardContent>
            <div className="mb-4">
              <p>{goal.Description}</p>
            </div>
              <div className="flex items-center justify-between mt-4">
              <div className="flex flex-wrap gap-2">
                  <span className="text-sm mr-2">Strategic Indicator:</span>
                  <Badge color="primary">{goal.StrategicIndicator}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm mr-2">KPI:</span>
                  <Badge color="secondary">{goal.KPI}</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm mr-2">Developer:</span>
                  <Badge color="success">{goal.Developer}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm mr-2">Related Issues:</span>
                  {goal.RelatedIssues.map((issue, i) => (
                    <Badge key={i} color="warning">{issue}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end mt-4 text-gray-500">
                <Info name="info" size={16} className="mr-2" />
                <span>Additional information</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default GoalsPage;
