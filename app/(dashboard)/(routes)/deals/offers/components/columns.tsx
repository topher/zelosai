// app/(dashboard)/routes/workflows/offers/components/columns.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Offer } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon, RefreshCwIcon, MessageCircleIcon } from "lucide-react";
import SelectAllCheckbox from "@/app/components/atomic/organisms/select-all-checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

// Action Handlers can be passed as props if needed
export const columns = (
  handleAccept: (offerId: string) => void,
  handleDeny: (offerId: string) => void,
  handleCounter: (offerId: string) => void,
  handleSendMessage: (offerId: string) => void
): ColumnDef<Offer>[] => [
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
    header: "Offer ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const currency = row.getValue("priceCurrency") as string;
      return `${currency} ${price.toFixed(2)}`;
    },
  },
  {
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) => {
      const availability = row.getValue("availability") as Offer["availability"];
      let color = "gray";

      switch (availability) {
        case "InStock":
          color = "green";
          break;
        case "OutOfStock":
          color = "red";
          break;
        case "PreOrder":
          color = "yellow";
          break;
        case "Discontinued":
          color = "gray";
          break;
        default:
          color = "gray";
      }

      return <Badge color={color}>{availability || "N/A"}</Badge>;
    },
  },
  {
    accessorKey: "validFrom",
    header: "Valid From",
    cell: ({ row }) => {
      const date = new Date(row.getValue("validFrom") as string);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "validThrough",
    header: "Valid Through",
    cell: ({ row }) => {
      const date = new Date(row.getValue("validThrough") as string);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "offerType",
    header: "Offer Type",
    cell: ({ row }) => {
      const offerType = row.getValue("offerType") as Offer["offerType"];
      return offerType || "N/A";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Offer["status"];
      let color = "gray";

      switch (status) {
        case "Pending":
          color = "yellow";
          break;
        case "Accepted":
          color = "green";
          break;
        case "Denied":
          color = "red";
          break;
        case "Countered":
          color = "blue";
          break;
        default:
          color = "gray";
      }

      return <Badge color={color}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {row.original.status === "Pending" && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAccept(row.original.id)}
              title="Accept Offer"
            >
              <CheckIcon className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeny(row.original.id)}
              title="Deny Offer"
            >
              <XIcon className="h-4 w-4 mr-1" />
              Deny
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCounter(row.original.id)}
              title="Counter Offer"
            >
              <RefreshCwIcon className="h-4 w-4 mr-1" />
              Counter
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-white"
          onClick={() => handleSendMessage(row.original.id)}
          title="Send Message"
        >
          <MessageCircleIcon className="h-4 w-4 mr-1" />
          Message
        </Button>
      </div>
    ),
  },
];
