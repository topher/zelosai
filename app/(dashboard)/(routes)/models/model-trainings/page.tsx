"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/(dashboard)/components/shared/data-table/data-table";
import { ModelTraining } from "@/app/types";
import { columns } from "./components/columns"; // ModelTraining-specific columns
import Image from "next/image";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

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

  if (loading) return <p>Loading model trainings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="md:hidden">
        {/* Mobile view images for model trainings if any */}
        <Image
          src="/examples/model-trainings-light.png"
          width={1280}
          height={998}
          alt="Model Trainings"
          className="block dark:hidden"
        />
        <Image
          src="/examples/model-trainings-dark.png"
          width={1280}
          height={998}
          alt="Model Trainings"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight ${montserrat.className}`}>
              Model Trainings
            </h2>
            <p className="text-muted-foreground">
              Manage your model training sessions.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => alert("Add New Model Training")}>Add New Model Training</Button>
          </div>
        </div>
        <DataTable<ModelTraining, string>
          columns={columns(handleDelete)}
          data={modelTrainings}
        />
      </div>
    </>
  );
};

export default ModelTrainingsPage;
