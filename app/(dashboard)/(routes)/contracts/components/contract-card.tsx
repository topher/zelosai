"use client"
import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import React, { useState } from "react"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { ContractModel } from "@/app/types"
import { contracts } from "@/app/data"
import Link from "next/link"

interface ContractCardProps extends React.HTMLAttributes<HTMLDivElement> {
  contract: ContractModel
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}


export function ContractCard({
  contract,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ContractCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link href={`/contracts/${contract.id}`}>
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            {!imageError ? (
              <Image
                src={contract.cover}
                alt={contract.title}
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
                  style={{ backgroundColor: '#111827' }} // Custom background color
                >
                {contract.emoji}
              </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Contract</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Contract
              </ContextMenuItem>
              <ContextMenuSeparator />
              {contracts.map((contract) => (
                <ContextMenuItem key={contract.title}>
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
                  {contract.title}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Review Next</ContextMenuItem>
          <ContextMenuItem>Review Later</ContextMenuItem>
          <ContextMenuItem>Create Task</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{contract.title}</h3>
        <p className="text-xs text-muted-foreground">{contract.creator}</p>
      </div>
    </div>
    </Link>
  )
}