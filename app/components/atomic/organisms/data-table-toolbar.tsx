// /app/components/atomic/organisms/data-table-toolbar.tsx

"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "@/app/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3">
      <div className="flex flex-1 items-center flex-wrap gap-4">
        <Input
          placeholder="Search..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full max-w-xs bg-transparent text-white placeholder-gray-400 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
            className="bg-transparent text-white border border-white/20 rounded-md"
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
            className="bg-transparent text-white border border-white/20 rounded-md"
          />
        )}
        {isFiltered && (
          <button
            onClick={() => table.resetColumnFilters()}
            className="flex items-center h-8 px-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Reset Filters
            <Cross2Icon className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
