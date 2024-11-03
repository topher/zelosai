// app/(dashboard)/(routes)/settings/usage/components/FeatureUsageCard.tsx

"use client"

import React from "react"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { features, FeatureKey } from "@/config/featuresConfig"
import { Progress } from "@/components/ui/progress"

interface FeatureUsageCardProps {
  featureKey: FeatureKey
  used: number
  max: number | "unlimited"
  resourceCount: number
  resourceLimit: number | "unlimited"
}

export const FeatureUsageCard: React.FC<FeatureUsageCardProps> = ({
  featureKey,
  used,
  max,
  resourceCount,
  resourceLimit,
}) => {
  // Find the feature configuration
  const feature = features.find((f) => f.key === featureKey)

  if (!feature) return null

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow flex flex-col">
      <div className="flex items-center space-x-2 mb-2">
        <feature.metadata.icon className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold">{feature.metadata.label}</h3>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{feature.metadata.description}</p>

      {/* Credit Usage */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Credits Used: {used} / {max === "unlimited" ? "Unlimited" : max}
          </span>
          {max !== "unlimited" && (
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-gray-400 dark:text-gray-500 cursor-pointer">i</span>
              </TooltipTrigger>
              <TooltipContent>
                Maximum allowed: {max}
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {typeof max === "number" ? (
          <Progress value={Math.min((used / max) * 100, 100)} className="bg-blue-200 dark:bg-blue-700" />
        ) : (
          <Progress value={100} className="bg-green-200 dark:bg-green-700" />
        )}
      </div>

      {/* Resource Counts */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Resources: {resourceCount} / {resourceLimit === "unlimited" ? "Unlimited" : resourceLimit}
          </span>
          {resourceLimit !== "unlimited" && (
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-gray-400 dark:text-gray-500 cursor-pointer">i</span>
              </TooltipTrigger>
              <TooltipContent>
                Maximum resources allowed: {resourceLimit}
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {typeof resourceLimit === "number" ? (
          <Progress value={Math.min((resourceCount / resourceLimit) * 100, 100)} className="bg-purple-200 dark:bg-purple-700" />
        ) : (
          <Progress value={100} className="bg-green-200 dark:bg-green-700" />
        )}
      </div>
    </div>
  )
}
