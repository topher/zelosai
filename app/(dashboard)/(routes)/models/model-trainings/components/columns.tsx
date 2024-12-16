import { ColumnDef } from "@tanstack/react-table";
import { ModelTraining } from "@/app/types";
import { Button } from "@/components/ui/button";

export function columns(handleDelete: (id: string) => void): ColumnDef<ModelTraining>[] {
  return [
    {
      accessorKey: "modelName",
      header: "Model Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "trainingStatus",
      header: "Status",
    },
    {
      accessorKey: "accuracy",
      header: "Accuracy",
      cell: ({ row }) => <span>{row.original.accuracy}%</span>,
    },
    {
      accessorKey: "lastTrainedAt",
      header: "Last Trained At",
      cell: ({ row }) => <span>{new Date(row.original.lastTrainedAt).toLocaleString()}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button variant="destructive" size="sm" onClick={() => handleDelete(row.original.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
}
