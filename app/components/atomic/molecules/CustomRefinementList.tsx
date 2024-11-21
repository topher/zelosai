// components/atomic/molecules/CustomRefinementList.tsx

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
  <div className="custom-refinement-list">
    {items.map((item) => (
      <Chip
        key={item.value}
        label={item.label}
        onClick={() => onToggle(item.value)}
        className={item.isSelected ? 'bg-primary text-white' : 'bg-gray-100'}
      />
    ))}
  </div>
);

export default CustomRefinementList;
