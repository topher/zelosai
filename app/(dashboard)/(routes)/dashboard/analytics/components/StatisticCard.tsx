// /app/(dashboard)/(routes)/dashboard/analytics/components/StatisticCard.tsx

"use client";

import React, { useState } from "react";
import { Statistic } from "@/app/types";
import { BarChart, Tag } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatisticCardProps {
  statistic: Statistic;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ statistic }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative p-6 h-56 w-full flex flex-col justify-between rounded-xl transition-transform duration-300 transform bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden cursor-pointer"
      style={{
        boxShadow: isHovered
          ? `0 0 15px rgba(0, 0, 0, 0.3)`
          : `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
        transform: isHovered ? "scale(1.02)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Statistic Content */}
      <div className="relative z-10 mb-4">
        <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
          {statistic.title}
        </h3>
        {statistic.description && (
          <p className="text-xs text-gray-400 mt-1">
            {statistic.description}
          </p>
        )}
      </div>

      {/* Main Value */}
      <div className="relative z-10 flex-grow flex items-center justify-center">
        <p className="text-4xl font-bold text-white">{statistic.value}</p>
      </div>

      {/* Tags */}
      {statistic.tags && statistic.tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2 mt-4">
          {statistic.tags.map((tag, idx) => (
            <TooltipProvider key={idx}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center bg-gray-600 text-white text-xs px-3 py-1 rounded-full shadow-md cursor-default">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">{tag}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticCard;
