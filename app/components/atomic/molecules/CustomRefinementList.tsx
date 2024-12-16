// components/atomic/molecules/CustomRefinementList.tsx

'use client';

import React from 'react';
import Chip from '@/app/components/atomic/atoms/Chip';

interface CustomRefinementListProps {
  items: { label: string; value: string; isSelected: boolean }[];
  onToggle: (value: string) => void;
}

const CustomRefinementList: React.FC<CustomRefinementListProps> = ({
  items,
  onToggle,
}) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <Chip
        key={item.value}
        label={item.label}
        onClick={() => onToggle(item.value)}
        className={`cursor-pointer px-3 py-1 text-sm font-medium rounded-full border transition-colors duration-200 ${
          item.isSelected
            ? 'bg-primary text-white border-primary'
            : 'bg-transparent text-gray-200 border-gray-300 hover:bg-gray-700/10'
        }`}
      />
    ))}
  </div>
);

export default CustomRefinementList;
