// /app/(dashboard)/(routes)/models/model-trainings/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import TableViewLayout from "@/app/components/atomic/templates/TableViewLayout";
import { ModelTraining } from "@/app/types";
import { columns } from "./components/columns"; // ModelTraining-specific columns

const ModelTrainingsPage = () => {
  const { userId, orgId } = useAuth();
  const [modelTrainings, setModelTrainings] = useState<ModelTraining[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId && orgId) {
      const fetchModelTrainings = async () => {
        try {
          const response = await fetch(`/api/resource/model_trainings`);

          if (response.ok) {
            const data = await response.json();
            setModelTrainings(data.resources);
          } else {
            console.error("Failed to fetch model trainings:", response.statusText);
            setError("Failed to load model trainings.");
          }
        } catch (err) {
          console.error("Error fetching model trainings:", err);
          setError("Failed to load model trainings.");
        } finally {
          setLoading(false);
        }
      };

      fetchModelTrainings();
    }
  }, [userId, orgId]);

  // Action Handlers
  const handleDelete = async (modelTrainingId: string) => {
    try {
      const response = await fetch(`/api/resource/model_trainings/${modelTrainingId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete model training.");
      }

      // Remove the model training from the local state
      setModelTrainings((prevModelTrainings) =>
        prevModelTrainings.filter((mt) => mt.id !== modelTrainingId)
      );
    } catch (error) {
      console.error("Error deleting model training:", error);
      alert("Failed to delete model training.");
    }
  };

  return (
    <TableViewLayout<ModelTraining, string>
      header={{
        title: "Model Trainings",
        description: "Manage your model training sessions.",
        actions: (
          <Button onClick={() => alert("Add New Model Training")}>
            <PlusCircledIcon className="mr-2 h-5 w-5" />
            Add New Model Training
          </Button>
        ),
      }}
      isLoading={loading}
      error={error}
      data={modelTrainings}
      columns={columns(handleDelete)}
    />
  );
};

export default ModelTrainingsPage;
