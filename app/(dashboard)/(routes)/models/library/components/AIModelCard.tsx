// library/components/AIModelCard.tsx

import { LibraryCard } from "@/app/components/atomic/organisms/LibraryCard";
import { AIModel } from "@/app/types";
import React from "react";
import {
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface AIModelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tool: AIModel;
  aspectRatio?: "portrait" | "landscape" | "square";
  width?: number;
  height?: number;
}

export function AIModelCard({ tool, ...props }: AIModelCardProps) {
  const emoji = tool.tags.includes("voice")
    ? "🔊"
    : tool.tags.includes("text")
    ? "✏️"
    : "🚀";

  const contextMenuItems = (
    <>
      <ContextMenuItem>{tool.label}</ContextMenuItem>
      <p className="text-sm text-gray-400">{tool.description}</p>
      <ContextMenuSeparator className="bg-gray-700" />
      <ContextMenuItem>Learn More</ContextMenuItem>
    </>
  );

  return (
    <LibraryCard
      title={tool.label}
      description={tool.description}
      imageUrl={tool.iconName}
      emoji={emoji}
      contextMenuItems={contextMenuItems}
      objectFit={tool.tags.includes("foundational") ? "contain" : "cover"}
      {...props}
    />
  );
}
