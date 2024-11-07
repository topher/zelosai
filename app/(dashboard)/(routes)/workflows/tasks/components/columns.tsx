// app/(dashboard)/routes/workflows/tasks/components/columns.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from "lucide-react";
import SelectAllCheckbox from "@/app/components/atomic/organisms/select-all-checkbox";
import { Checkbox } from "@/components/ui/checkbox";

// Optional: Define a delete handler or pass it as a prop
const handleDeleteTask = async (taskId: string) => {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    const response = await fetch(`/api/resource/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task.");
    }

    // Optionally, trigger a refetch or state update here
  } catch (error) {
    console.error("Error deleting task:", error);
    alert("Failed to delete task.");
  }
};

export const columns = (
  toggleTaskVisibility: (taskId: string) => void
): ColumnDef<Task>[] => [
  {
    id: "select",
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Task ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"];
      let color = "gray";

      switch (status) {
        case "Not Started":
          color = "yellow";
          break;
        case "In Progress":
          color = "blue";
          break;
        case "Completed":
          color = "green";
          break;
        case "Blocked":
          color = "red";
          break;
        default:
          color = "gray";
      }

      return <Badge color={color}>{status}</Badge>;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as Task["priority"];
      let color = "gray";

      switch (priority) {
        case "Low":
          color = "green";
          break;
        case "Medium":
          color = "yellow";
          break;
        case "High":
          color = "red";
          break;
        default:
          color = "gray";
      }

      return <Badge color={color}>{priority}</Badge>;
    },
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => {
      const visibility = row.getValue("visibility") as Task["visibility"];
      let color = "gray";

      switch (visibility) {
        case "public":
          color = "blue";
          break;
        case "private":
          color = "green";
          break;
        case "restricted":
          color = "orange";
          break;
        default:
          color = "gray";
      }

      return <Badge color={color}>{visibility}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string);
      return date.toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleTaskVisibility(row.original.id)}
        >
          {row.original.visibility === "public" ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          {row.original.visibility === "public" ? "Make Private" : "Make Public"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          color="red"
          onClick={() => handleDeleteTask(row.original.id)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
