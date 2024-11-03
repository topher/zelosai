// app/(dashboard)/components/RecommendationsGrid.tsx

'use client';

import React from 'react';
import ActionResourceRecommendationCard from './ActionResourceRecommendationCard';
import { Recommendation } from '@/app/types';

interface RecommendationsGridProps {
  recommendations: Recommendation[];
  onDo: (id: string) => void;
  onArchive: (id: string) => void;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
}

const RecommendationsGrid: React.FC<RecommendationsGridProps> = ({
  recommendations,
  onDo,
  onArchive,
  onLike,
  onComment,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#0A0E27]">
      {/* Scrollable Cards Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <ActionResourceRecommendationCard
              key={rec.id}
              recommendation={rec}
              onDo={onDo}
              onArchive={onArchive}
              onLike={onLike}
              onComment={onComment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsGrid;
