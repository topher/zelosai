// workflows/components/WorkflowCard.tsx

"use client";

import { LibraryCard } from "@/app/components/atomic/organisms/LibraryCard";
import { Workflow } from "@/app/types";
import React from "react";
import {
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface WorkflowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: Workflow;
  aspectRatio?: "portrait" | "landscape" | "square";
  width?: number;
  height?: number;
}

export function WorkflowCard({ item, ...props }: WorkflowCardProps) {
  const contextMenuItems = (
    <>
      <ContextMenuItem>Edit Workflow</ContextMenuItem>
      <ContextMenuItem>Delete Workflow</ContextMenuItem>
      <ContextMenuSeparator className="bg-gray-700" />
      <ContextMenuItem>Run Now</ContextMenuItem>
      <ContextMenuItem>Schedule</ContextMenuItem>
      <ContextMenuSeparator className="bg-gray-700" />
      <ContextMenuItem>Share</ContextMenuItem>
    </>
  );

  return (
    <LibraryCard
      title={item.name}
      description={item.description}
      imageUrl={item.cover}
      emoji={item.emoji || "🔄"}
      contextMenuItems={contextMenuItems}
      {...props}
    />
  );
}
