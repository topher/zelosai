// components/atomic/molecules/StatusNav.tsx

'use client';

import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import CustomRefinementList from './CustomRefinementList';

interface StatusNavProps {
  items: {
    label: string;
    value: string;
    isRefined: boolean;
    count: number;
  }[];
  refine: (values: string[]) => void;
}

const StatusNavComponent: React.FC<StatusNavProps> = ({ items, refine }) => {
  const onToggle = (value: string) => {
    const currentRefinements = items.filter(item => item.isRefined).map(item => item.value);

    if (currentRefinements.includes(value)) {
      // Remove the value from the refinements
      refine(currentRefinements.filter(item => item !== value));
    } else {
      // Add the value to the refinements
      refine([...currentRefinements, value]);
    }
  };

  const transformedItems = items.map(item => ({
    label: `${item.label} (${item.count})`,
    value: item.value,
    isSelected: item.isRefined,
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Status</h3>
      <CustomRefinementList items={transformedItems} onToggle={onToggle} />
    </div>
  );
};

export const StatusNav = connectRefinementList(StatusNavComponent);
