// app/(dashboard)/routes/workflows/transactions/components/columns.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from "lucide-react";
import SelectAllCheckbox from "@/app/(dashboard)/components/shared/data-table/select-all-checkbox";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = (
  toggleTransactionStatus: (transactionId: string) => void
): ColumnDef<Transaction>[] => [
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
    header: "Transaction ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "transactionType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("transactionType") as Transaction["transactionType"];
      let color = "gray";

      switch (type) {
        case "Purchase":
          color = "green";
          break;
        case "Sale":
          color = "blue";
          break;
        case "Refund":
          color = "red";
          break;
        case "Transfer":
          color = "purple";
          break;
        default:
          color = "gray";
      }

      return <Badge color={color}>{type}</Badge>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const currency = row.getValue("currency") as string;
      return `${currency} ${amount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Transaction["status"];
      let color = "gray";

      switch (status) {
        case "Pending":
          color = "yellow";
          break;
        case "Completed":
          color = "green";
          break;
        case "Failed":
          color = "red";
          break;
        case "Cancelled":
          color = "gray";
          break;
        default:
          color = "gray";
      }

      return <Badge color={color}>{status}</Badge>;
    },
  },
  {
    accessorKey: "transactionDate",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("transactionDate") as string);
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
          onClick={() => toggleTransactionStatus(row.original.id)}
        >
          {row.original.status === "Pending" ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          {row.original.status === "Pending" ? "Complete" : "Reopen"}
        </Button>
        <Button variant="ghost" size="sm" color="red" onClick={() => handleDeleteTransaction(row.original.id)}>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

// Optional: Define a delete handler
const handleDeleteTransaction = async (transactionId: string) => {
  if (!confirm("Are you sure you want to delete this transaction?")) return;

  try {
    const response = await fetch(`/api/resource/transactions/${transactionId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete transaction.");
    }

    // Optionally, trigger a refetch or state update here
  } catch (error) {
    console.error("Error deleting transaction:", error);
    alert("Failed to delete transaction.");
  }
};
