"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { DataCategory } from "@/app/types"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<DataCategory>[] = [
  // Remove selection column as it's not relevant for taxonomy
  // {
  //   id: "select",
  //   // ... rest of selection column definition
  // },
  {
    accessorKey: "fides_key", // Assuming 'Term' is the field holding the unique identifier
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Term (fides_key)" /> // Display both human-readable and fides_key
    ),
    cell: ({ row }) => <div>{row.getValue("fides_key")}</div>, // Assuming 'Term' is the field
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>, // Assuming 'Name' is the field
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>, // Assuming 'Description' is the field
  },
  {
    accessorKey: "parent_key",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parent Term" />
    ),
    cell: ({ row }) => <div>{row.getValue("parent_key")}</div>, // Assuming 'ParentTerm' is the field
  },
  {
    accessorKey: "is_default",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Default" />
    ),
    cell: ({ row }) => (row.getValue("is_default") ? "Yes" : "No"), // Assuming 'IsDefault' is a boolean field
  },
  {
    accessorKey: "version_added",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Version Added" />
    ),
    cell: ({ row }) => <div>{row.getValue("version_added")}</div>, // Assuming 'VersionAdded' is the field
  },
  {
    accessorKey: "version_deprecated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Version Deprecated" />
    ),
    cell: ({ row }) => (row.getValue("version_deprecated") ? row.getValue("version_deprecated") : "-"), // Handle empty values
  },
  {
    accessorKey: "tags",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tags" />,
    cell: ({ row }) => <div>{row.getValue("tags")}</div>, // Assuming 'Tags' is an array of strings, join with comma
  },
];