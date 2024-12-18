// /app/(dashboard)/(routes)/strategy/goals/page.tsx

"use client";

import { useEffect, useState, useCallback } from "react";
import { FeatureKey } from "@/config/featuresConfig";
import { useResourceModal } from "@/app/context/ResourceModalContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Goal } from "@/app/types";
import DeleteConfirmationModal from "@/app/components/atomic/templates/modals/DeleteConfirmationModal";
import { ResourceType } from "@/config/resourceTypes";
import CardGridLayout from "@/app/components/atomic/templates/CardGridLayout";
import { Pencil } from "lucide-react";
import GoalCard from "@/app/components/atomic/molecules/cards/GoalCard";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { openResourceModal } = useResourceModal();

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/resource/goals");
        if (response.ok) {
          const data = await response.json();
          setGoals(data.resources);
        } else {
          console.error("Failed to fetch goals:", response.statusText);
          setError("Failed to fetch goals.");
          toast({
            title: "Error",
            description: "Failed to fetch goals.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
        setError("An unexpected error occurred while fetching goals.");
        toast({
          title: "Error",
          description: "An unexpected error occurred while fetching goals.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: updatedGoal.isActive }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Goal "${updatedGoal.Goal}" is now ${updatedGoal.isActive ? "active" : "inactive"}.`,
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
    <>
      <CardGridLayout
        header={{
          title: 'Goals',
          description: 'Manage your goals.',
          actions: (
            <Button
              onClick={() => {
                console.log("Create New Goal button clicked");
                openResourceModal(
                  'create',
                  ResourceType.Goal,
                  undefined,
                  undefined,
                  handleCreateSuccess
                );
              }}
            >
              <PlusCircledIcon className="mr-2 h-5 w-5" />
              <span>Create New Goal</span>
            </Button>
          ),
        }}
        isLoading={isLoading}
        error={error}
        items={goals}
        renderItem={(goal: Goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            toggleGoalStatus={toggleGoalStatus}
            onEdit={() => openResourceModal(
              'update',
              ResourceType.Goal,
              goal.id,
              goal,
              handleUpdateSuccess
            )}
            onDelete={openDeleteModal}
          />
        )}
      />

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
    </>
  );
};

export default GoalsPage;
