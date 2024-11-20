// /app/components/atomic/molecules/cards/ActionResourceRecommendationCard.tsx

"use client";

import React, { useState } from "react";
import {
  features,
  featureCategoryConfig,
  FeatureKey,
} from "@/config/featuresConfig";
import { Heart, MessageCircle, Archive, Play } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Recommendation } from "@/app/types";

interface ActionResourceRecommendationCardProps {
  recommendation: Recommendation;
  onDo: (id: string) => void;
  onArchive: (id: string) => void;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
}

const ActionResourceRecommendationCard: React.FC<
  ActionResourceRecommendationCardProps
> = ({
  recommendation,
  onDo,
  onArchive,
  onLike,
  onComment,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get the feature corresponding to the recommendation
  const feature = features.find(
    (f) => f.key === (recommendation.featureKey as FeatureKey)
  );

  const featureMeta = feature?.metadata;
  const categoryMeta =
    featureMeta && featureCategoryConfig[featureMeta.category];

  // Common card style for error cases
  const errorCardStyle =
    "relative p-4 h-48 w-full flex flex-col justify-between rounded-xl shadow-lg transition-transform duration-300 transform bg-red-900/50 border border-red-700";

  // Render an error card if feature or category metadata is missing
  if (!feature || !categoryMeta) {
    console.error(
      `Missing ${
        !feature ? "feature" : "category"
      } metadata for featureKey: ${recommendation.featureKey}`
    );
    return (
      <div className={errorCardStyle}>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {recommendation.title}
          </h3>
          {recommendation.description && (
            <p className="text-white/80 text-sm mt-3">
              {recommendation.description}
            </p>
          )}
        </div>
        <p className="text-white mt-2 text-sm">
          Error: Missing {feature ? "category" : "feature"} metadata.
        </p>
      </div>
    );
  }

  const IconComponent = featureMeta.icon;

  return (
    <div
      className="relative p-4 h-48 w-full flex flex-col justify-between rounded-xl transition-transform duration-300 transform cursor-pointer bg-gray-800 overflow-hidden"
      style={{
        border: `1px solid ${categoryMeta.colorHex}66`,
        boxShadow: isHovered
          ? `0 0 15px ${categoryMeta.colorHex}80`
          : `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Overlay with Category Color */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(135deg, transparent 30%, ${categoryMeta.colorHex}20 100%)`,
        }}
      ></div>

      {/* Semi-transparent Category Icon as Background */}
      <div
        className="absolute inset-y-0 right-2 flex items-center opacity-30"
        style={{
          zIndex: 0,
        }}
      >
        <IconComponent size={150} />
      </div>

      {/* Recommendation Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-1">
          {recommendation.title}
        </h3>
        {recommendation.description && (
          <p className="text-white/80 text-sm clamp-2-lines mt-3">
            {recommendation.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center space-x-2 relative z-10">
        <TooltipProvider>
          {/* Do Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-3 rounded-xl text-blue-400 bg-gray-800 bg-opacity-80 border border-gray-600 hover:bg-gray-700 hover:shadow-lg transition-colors duration-200"
                onClick={() => onDo(recommendation.id)}
                aria-label="Do Action"
              >
                <Play size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Do</TooltipContent>
          </Tooltip>

          {/* Archive Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-3 rounded-xl text-gray-400 bg-gray-800 bg-opacity-80 border border-gray-600 hover:bg-gray-700 hover:shadow-lg transition-colors duration-200"
                onClick={() => onArchive(recommendation.id)}
                aria-label="Archive Recommendation"
              >
                <Archive size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Archive</TooltipContent>
          </Tooltip>

          {/* Like Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-3 rounded-xl text-red-400 bg-gray-800 bg-opacity-80 border border-gray-600 hover:bg-gray-700 hover:shadow-lg transition-colors duration-200"
                onClick={() => onLike(recommendation.id)}
                aria-label="Like Recommendation"
              >
                <Heart size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Like</TooltipContent>
          </Tooltip>

          {/* Comment Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-3 rounded-xl text-green-400 bg-gray-800 bg-opacity-80 border border-gray-600 hover:bg-gray-700 hover:shadow-lg transition-colors duration-200"
                onClick={() => onComment(recommendation.id)}
                aria-label="Comment on Recommendation"
              >
                <MessageCircle size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Comment</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActionResourceRecommendationCard;
