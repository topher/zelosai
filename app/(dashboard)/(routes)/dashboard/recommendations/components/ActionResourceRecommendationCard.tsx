// app/(dashboard)/components/ActionResourceRecommendationCard.tsx

'use client';

import React, { useState } from 'react';
import { features, featureCategoryConfig, FeatureKey } from '@/config/featuresConfig';
import { Heart, MessageCircle, Archive, Play } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Recommendation } from '@/app/types';

interface ActionResourceRecommendationCardProps {
  recommendation: Recommendation;
  onDo: (id: string) => void;
  onArchive: (id: string) => void;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
}

const ActionResourceRecommendationCard: React.FC<ActionResourceRecommendationCardProps> = ({
  recommendation,
  onDo,
  onArchive,
  onLike,
  onComment,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get the feature corresponding to the recommendation
  const feature = features.find((f) => f.key === recommendation.featureKey as FeatureKey);

  if (!feature) {
    console.error(`No feature found for featureKey: ${recommendation.featureKey}`);
    return (
      <div className="relative rounded-xl shadow-lg p-4 bg-red-500">
        <h3 className="text-lg font-semibold text-white mb-1">{recommendation.title}</h3>
        {recommendation.description && (
          <p className="text-white/80 text-sm">
            {recommendation.description}
          </p>
        )}
        <p className="text-white">Error: Missing feature metadata.</p>
      </div>
    );
  }

  const featureMeta = feature.metadata;
  const categoryMeta = featureCategoryConfig[featureMeta.category];

  if (!categoryMeta) {
    console.error(`No category metadata found for category: ${featureMeta.category}`);
    return (
      <div className="relative rounded-xl shadow-lg p-4 bg-red-500">
        <h3 className="text-lg font-semibold text-white mb-1">{recommendation.title}</h3>
        {recommendation.description && (
          <p className="text-white/80 text-sm">
            {recommendation.description}
          </p>
        )}
        <p className="text-white">Error: Missing category metadata.</p>
      </div>
    );
  }

// Enhanced glassmorphic styles with more vibrant colors
const cardStyles = {
  background: `linear-gradient(135deg, ${categoryMeta.colorHex}3D, ${categoryMeta.colorHex}5A)`, // Adjusted transparency for a brighter gradient
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)', // For Safari support
  border: `1px solid ${categoryMeta.colorHex}66`, // Semi-transparent border with more contrast
  borderRadius: '16px',
  boxShadow: `0 4px 12px ${categoryMeta.colorHex}55`, // Soft shadow with a hint of color
};


  const IconComponent = featureMeta.icon;

  return (
    <div
      className="relative p-4 h-48 w-full flex flex-col justify-between transition-all duration-300 rounded-xl shadow-lg cursor-pointer card"
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Feature Icon */}
      <div className="absolute top-4 right-4 text-white opacity-50">
        <IconComponent size={24} />
      </div>

      {/* Recommendation Content */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">
          {recommendation.title}
        </h3>
        {recommendation.description && (
          <p className="text-white/80 text-sm clamp-2-lines">
            {recommendation.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center space-x-2">
        <TooltipProvider>
          {/* Do Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-2 rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#3B82F6' }} // Blue
                onClick={() => onDo(recommendation.id)}
                aria-label="Do Action"
              >
                <Play size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Do</TooltipContent>
          </Tooltip>

          {/* Archive Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-2 rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#6B7280' }} // Gray
                onClick={() => onArchive(recommendation.id)}
                aria-label="Archive Recommendation"
              >
                <Archive size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Archive</TooltipContent>
          </Tooltip>

          {/* Like Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-2 rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#EF4444' }} // Red
                onClick={() => onLike(recommendation.id)}
                aria-label="Like Recommendation"
              >
                <Heart size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Like</TooltipContent>
          </Tooltip>

          {/* Comment Action */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-2 rounded-full text-white hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#10B981' }} // Green
                onClick={() => onComment(recommendation.id)}
                aria-label="Comment on Recommendation"
              >
                <MessageCircle size={20} />
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
