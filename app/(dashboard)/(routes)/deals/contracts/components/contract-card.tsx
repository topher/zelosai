// contracts/components/ContractCard.tsx

"use client";

import { LibraryCard } from "@/app/components/atomic/organisms/LibraryCard";
import { ContractModel } from "@/app/types";
import React from "react";
import {
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface ContractCardProps extends React.HTMLAttributes<HTMLDivElement> {
  contract: ContractModel;
  aspectRatio?: "portrait" | "landscape" | "square";
  width?: number;
  height?: number;
}

export function ContractCard({ contract, ...props }: ContractCardProps) {
  const contextMenuItems = (
    <>
      <ContextMenuItem>Edit Contract</ContextMenuItem>
      <ContextMenuItem>Delete Contract</ContextMenuItem>
      <ContextMenuSeparator className="bg-gray-700" />
      <ContextMenuItem>Review Next</ContextMenuItem>
      <ContextMenuItem>Review Later</ContextMenuItem>
      <ContextMenuSeparator className="bg-gray-700" />
      <ContextMenuItem>Share</ContextMenuItem>
    </>
  );

  return (
    <LibraryCard
      title={contract.title}
      description={contract.description}
      imageUrl={contract.cover}
      emoji={contract.emoji || "📄"}
      contextMenuItems={contextMenuItems}
      {...props}
    />
  );
}
