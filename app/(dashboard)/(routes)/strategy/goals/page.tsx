"use client";

import { useEffect, useState, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Info, Pencil, Trash } from "lucide-react";
import { FeatureKey } from "@/config/featuresConfig";
import StrategyLayout from "@/app/components/atomic/ttemplates/StrategyLayout";
import { useResourceModal } from "@/app/context/ResourceModalContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { Goal } from "@/app/types";
import DeleteConfirmationModal from '@/app/components/atomic/ttemplates/modals/DeleteConfirmationModal'; // New import

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { openResourceModal } = useResourceModal();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const openDeleteModal = useCallback((goalId: string) => {
    setSelectedGoalId(goalId);
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    if (selectedGoalId) {
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== selectedGoalId));
      toast({
        title: "Deleted",
        description: `Goal deleted successfully.`,
      });
      setSelectedGoalId(null);
    }
  }, [selectedGoalId]);

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
          toast({
            title: "Error",
            description: "Failed to fetch goals.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching goals.",
          variant: "destructive",
        });
      }
    };
    fetchGoals();
  }, []);

  // Function to toggle goal status (active/inactive)
  const toggleGoalStatus = useCallback(async (goal: Goal) => {
    const updatedGoal = { ...goal, isActive: !goal.isActive };

    // Optimistically update the UI
    setGoals((prevGoals) => prevGoals.map(g => g.id === goal.id ? updatedGoal : g));

    try {
      // Update the goal in the backend
      const response = await fetch(`/api/resource/goals/${goal.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: updatedGoal.isActive }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Goal "${updatedGoal.Goal}" is now ${updatedGoal.isActive ? 'active' : 'inactive'}.`,
        });
      } else {
        throw new Error(`Failed to update goal status: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating goal status:", error);
      // Revert the UI change
      setGoals((prevGoals) => prevGoals.map(g => g.id === goal.id ? { ...g, isActive: !g.isActive } : g));
      toast({
        title: "Error",
        description: "Failed to update goal status.",
        variant: "destructive",
      });
    }
  }, []);

  // Function to handle successful creation of a new goal
  const handleCreateSuccess = useCallback((newGoal: Goal) => {
    console.log("New goal created:", newGoal);
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    toast({
      title: "Success",
      description: `Goal "${newGoal.Goal}" created successfully.`,
    });
  }, []);

  // Function to handle successful update of a goal
  const handleUpdateSuccess = useCallback((updatedGoal: Goal) => {
    console.log("Goal updated:", updatedGoal);
    setGoals((prevGoals) => prevGoals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    toast({
      title: "Success",
      description: `Goal "${updatedGoal.Goal}" updated successfully.`,
    });
  }, []);

  return (
    <StrategyLayout>
      <div className="space-y-8 p-6">
        {/* Header with Create New Goal Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Goals</h1>
          <Button
            onClick={() => {
              console.log("Create New Goal button clicked");
              openResourceModal(
                'create',
                FeatureKey.Goals,
                undefined,
                undefined,
                handleCreateSuccess
              );
            }}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Pencil className="h-4 w-4" />
            <span>Create New Goal</span>
          </Button>
        </div>
        <Separator />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.id} className="bg-white border border-gray-200 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-gray-800">{goal.Goal}</CardTitle>
                  <Switch
                    checked={goal.isActive}
                    onCheckedChange={() => toggleGoalStatus(goal)}
                    className="focus:ring-blue-500"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-gray-700">{goal.Description}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-2 sm:space-y-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-600">Strategic Indicator:</span>
                    <Badge color="primary">{goal.StrategicIndicator || 'N/A'}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-600">KPI:</span>
                    <Badge color="secondary">{goal.KPI || 'N/A'}</Badge>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 space-y-2 sm:space-y-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-600">Developer:</span>
                    <Badge color="success">{goal.Developer || 'N/A'}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-600">Related Issues:</span>
                    {goal.RelatedIssues?.length ? (
                      goal.RelatedIssues.map((issue, i) => (
                        <Badge key={i} color="warning">
                          {issue}
                        </Badge>
                      ))
                    ) : (
                      <Badge color="warning">N/A</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end mt-4 text-gray-500">
                  <Info size={16} className="mr-2" />
                  <span>Additional information</span>
                </div>
                {/* Edit and Delete Buttons */}
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openResourceModal(
                      'update',
                      FeatureKey.Goals,
                      goal.id,
                      goal,
                      handleUpdateSuccess
                    )}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 border-blue-600 hover:border-blue-700"
                  >
                    <Pencil className="h-4 w-4" />
                    <span>Edit</span>
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteModal(goal.id)}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 border-red-600 hover:border-red-700"
                  >
                    <Trash className="h-4 w-4" />
                    <span>Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {selectedGoalId && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          resourceType="goals"
          resourceId={selectedGoalId}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </StrategyLayout>
  );
};

export default GoalsPage;
