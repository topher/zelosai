// /app/components/atomic/molecules/cards/AlertCard.tsx

"use client";

import React, { useState } from "react";
import { Alert } from "@/app/types";

interface AlertCardProps {
  alert: Alert;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getAlertColorHex = (severity: string): string => {
    switch (severity) {
      case "error":
        return "#EF4444"; // Red
      case "warning":
        return "#FCD34D"; // Yellow
      case "info":
      default:
        return "#60A5FA"; // Blue
    }
  };

  const alertColorHex = getAlertColorHex(alert.severity);
  const alertColorHex40 = `${alertColorHex}66`; // ~40% opacity
  const alertColorHex50 = `${alertColorHex}80`; // ~50% opacity
  const alertColorHex12 = `${alertColorHex}1F`; // ~12% opacity

  return (
    <div
      className="relative p-4 h-48 w-full flex flex-col justify-between rounded-xl transition-transform duration-300 transform cursor-pointer bg-gray-800 overflow-hidden"
      style={{
        border: `1px solid ${alertColorHex40}`,
        boxShadow: isHovered
          ? `0 0 15px ${alertColorHex50}`
          : `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 30%, ${alertColorHex12} 100%)`,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-1">{alert.title}</h3>
        <p className="text-sm text-white/80">{alert.message}</p>
      </div>

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-2 mt-4">
        {alert.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full shadow-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AlertCard;
