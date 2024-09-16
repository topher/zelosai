"use client";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Workflow } from "@/app/types";
import { getWorkflowsByAccountId } from "@/app/actions/workflowsActions"; // Fetch from Elasticsearch

interface WorkflowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Workflow;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function WorkflowCard({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: WorkflowCardProps) {
  const [imageError, setImageError] = useState(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch workflows from Elasticsearch using accountId
    const accountId = "12345"; // Dummy account ID
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        const data = await getWorkflowsByAccountId(accountId);
        setWorkflows(data);
      } catch (err) {
        setError("Failed to load workflows.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            {!imageError ? (
              <Image
                src={album.cover}
                alt={album.name}
                width={width}
                height={height}
                className={cn(
                  "h-auto w-auto object-cover transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className={cn(
                  "flex items-center justify-center text-white text-4xl font-bold",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
                style={{ backgroundColor: "#111827" }} // Custom background color
              >
                {album.emoji}
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Workflow</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Workflow
              </ContextMenuItem>
              <ContextMenuSeparator />
              {loading ? (
                <ContextMenuItem>Loading...</ContextMenuItem>
              ) : error ? (
                <ContextMenuItem>{error}</ContextMenuItem>
              ) : (
                workflows.map((workflow) => (
                  <ContextMenuItem key={workflow.id}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                    </svg>
                    {workflow.name}
                  </ContextMenuItem>
                ))
              )}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-muted-foreground">{album.artist}</p>
      </div>
    </div>
  );
}
