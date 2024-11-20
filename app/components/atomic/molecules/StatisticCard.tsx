// /app/(dashboard)/(routes)/dashboard/analytics/components/StatisticCard.tsx

"use client";

import React, { useState } from "react";
import { Statistic } from "@/app/types";
import { Badge } from "@/components/ui/badge";

interface StatisticCardProps {
  statistic: Statistic;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ statistic }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-gray-800 p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered
          ? `0 0 15px rgba(255, 255, 255, 0.3)`
          : `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      ></div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Title and Description */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">{statistic.title}</h3>
          <p className="text-white text-sm">{statistic.description}</p>
        </div>

        {/* Value */}
        <div className="flex items-center justify-center my-6">
          <p className="text-4xl font-bold text-white">{statistic.value}</p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {statistic.tags?.map((tag, idx) => (
            <Badge key={idx} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
