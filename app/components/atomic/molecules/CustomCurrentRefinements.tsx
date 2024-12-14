// components/atomic/molecules/CustomCurrentRefinements.tsx

import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import Chip from '@/app/components/atomic/atoms/Chip';

interface Refinement {
  attribute: string;
  id: string;
  label: string;
  type: string;
  value: any;
  operator?: string;
  exclude?: boolean;
}

interface CurrentRefinementItem {
  index: string;
  label: string;
  attribute: string;
  refine(refinement: Refinement): void;
  refinements: Refinement[];
}

interface CustomCurrentRefinementsProps {
  items: CurrentRefinementItem[];
}

const CustomCurrentRefinementsComponent: React.FC<CustomCurrentRefinementsProps> = ({ items }) => {
  const chips = items.flatMap(item =>
    item.refinements.map(refinement => (
      <Chip
        key={`${item.attribute}-${refinement.label}`}
        label={`${item.label}: ${refinement.label}`}
        onClick={() => item.refine(refinement)}
        className="px-3 py-1 text-sm font-medium rounded-full border border-primary bg-primary text-white hover:bg-primary/90 transition-colors duration-200"
      />
    ))
  );

  return <div className="flex flex-wrap gap-2 mb-4">{chips}</div>;
};

export const CustomCurrentRefinements = connectCurrentRefinements(CustomCurrentRefinementsComponent);
