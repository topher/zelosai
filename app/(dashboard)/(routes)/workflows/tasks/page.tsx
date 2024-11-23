// /app/(dashboard)/(routes)/workflows/tasks/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import TableViewLayout from "@/app/components/atomic/templates/TableViewLayout";
import { Task } from "@/app/types";
import { columns } from "./components/columns"; // Task-specific columns

const TaskPage = () => {
  const { userId, orgId } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId && orgId) {
      const fetchTasks = async () => {
        try {
          const response = await fetch(`/api/resource/tasks?orgId=${orgId}&ownerId=${userId}`);

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
      visibility: tasks[taskIndex].visibility === "public" ? "private" : "public",
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

  return (
    <TableViewLayout<Task, string>
      header={{
        title: "Tasks",
        description: "Here's a list of your tasks for this month!",
        actions: (
          <Link href="/dashboard/workflows/tasks/new">
            <Button>
              <PlusCircledIcon className="mr-2 h-5 w-5" />
              Add New Task
            </Button>
          </Link>
        ),
      }}
      isLoading={loading}
      error={error}
      data={tasks}
      columns={columns(toggleTaskVisibility)}
    />
  );
};

export default TaskPage;
