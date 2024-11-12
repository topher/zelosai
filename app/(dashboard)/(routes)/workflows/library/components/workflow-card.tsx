// workflows/components/WorkflowCard.tsx

"use client";

import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Workflow } from "@/app/types";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface WorkflowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: Workflow;
  aspectRatio?: "portrait" | "landscape" | "square";
  width?: number;
  height?: number;
}

export function WorkflowCard({
  item,
  className,
  width,
  height,
  aspectRatio = "landscape",
  ...props
}: WorkflowCardProps) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = item.cover || null;

  const aspectRatioClass =
    aspectRatio === "portrait"
      ? "aspect-[2/3]"
      : aspectRatio === "landscape"
      ? "aspect-[4/3]"
      : "aspect-square";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg shadow group",
        aspectRatioClass,
        className
      )}
      style={{ width, height }}
      {...props}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              {!imageError && imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-lg transition-transform duration-500 ease-out group-hover:scale-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center text-white font-bold"
                  style={{
                    backgroundColor: "rgba(17, 24, 39, 0.85)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  <span style={{ fontSize: "3rem" }}>{item.emoji || "🔄"}</span>
                </div>
              )}
            </div>
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <h3
                className={cn(
                  "text-white text-xl font-bold",
                  montserrat.className
                )}
                style={{ textShadow: "2px 2px 6px #000000" }}
              >
                {item.name}
              </h3>
              {item.description && (
                <p className="text-white text-sm mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-48">
          <ContextMenuItem>Edit Workflow</ContextMenuItem>
          <ContextMenuItem>Delete Workflow</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Run Now</ContextMenuItem>
          <ContextMenuItem>Schedule</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
