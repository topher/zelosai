"use client";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import {
  updateGoal
} from "@/app/actions/goalActions"; // Import CRUD actions
import { Goal } from "@/app/types"; // Import the Goal type
import StrategyLayout from "../StrategyLayout";

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [accountId] = useState("12345"); // Hardcoded accountId for now

  // Fetch goals on component mount
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("/api/resource/goals");
        if (response.ok) {
          const data = await response.json();
          setGoals(data.resources);
        } else {
          console.error("Failed to fetch goals:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, [accountId]);


  // Function to toggle goal status (active/inactive)
  const toggleGoalStatus = async (index: number) => {
    const updatedGoal = { ...goals[index], isActive: !goals[index].isActive };

    try {
      // Update the goal in Elasticsearch
      await updateGoal(goals[index].id, { isActive: updatedGoal.isActive });

      // Update the goal status in the local state
      setGoals((prevGoals) => {
        const updatedGoals = [...prevGoals];
        updatedGoals[index] = updatedGoal;
        return updatedGoals;
      });
    } catch (error) {
      console.error("Error updating goal status:", error);
    }
  };

  return (
    <StrategyLayout>
    <div className="space-y-8 p-6">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal, index) => (
          <Card key={goal.id} className="bg-white border border-gray-200 shadow-md">
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
                    <Badge key={i} color="warning">
                      {issue}
                    </Badge>
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
  </StrategyLayout>
  );
};

export default GoalsPage;
