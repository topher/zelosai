// app/(dashboard)/(routes)/workflows/tasks/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DataTable } from "@/app/components/atomic/organisms/data-table";
import { Task } from "@/app/types";
import { UserNav } from "@/app/components/atomic/organisms/user-nav";
import { columns } from "./components/columns"; // Task-specific columns
import { useAuth } from "@clerk/nextjs"; // Correct hook for authentication
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const TaskPage = () => {
  const { userId, orgId } = useAuth(); // Destructure orgId from Clerk's useUser
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId && orgId) {
      const ownerId = userId; // Get ownerId from Clerk's user object

      const fetchTasks = async () => {
        try {
          const response = await fetch(`/api/resource/tasks?orgId=${orgId}&ownerId=${ownerId}`);

          if (response.ok) {
            const data = await response.json();
            setTasks(data.resources);
          } else {
            console.error("Failed to fetch tasks:", response.statusText);
            setError("Failed to load tasks.");
          }
        } catch (err) {
          console.error("Error fetching tasks:", err);
          setError("Failed to load tasks.");
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();
    }
  }, [userId, orgId]);

  // Function to toggle task visibility or any other status
  const toggleTaskVisibility = async (taskId: string) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    const updatedTask: Task = {
      ...tasks[taskIndex],
      visibility:
        tasks[taskIndex].visibility === "public" ? "private" : "public",
    };

    try {
      // Update the task in the backend
      const response = await fetch(`/api/resource/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visibility: updatedTask.visibility }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task visibility.");
      }

      // Update the task in the local state
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks[taskIndex] = updatedTask;
        return newTasks;
      });
    } catch (error) {
      console.error("Error updating task visibility:", error);
      alert("Failed to update task visibility.");
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight ${montserrat.className}`}>
              Welcome back!
            </h2>
            <p className="text-muted-foreground">
              Here's a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/workflows/tasks/new">
              <Button>Add New Task</Button>
            </Link>
          </div>
        </div>
        <UserNav />
        <DataTable<Task, string>
          columns={columns(toggleTaskVisibility)}
          data={tasks}
        />
      </div>
    </>
  );
};

export default TaskPage;
