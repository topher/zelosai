// components/CustomRefinementList.tsx

'use client';

import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import { Chip, Stack } from '@mui/material';

interface CustomRefinementListProps {
  items: {
    label: string;
    value: string;
    count: number;
    isRefined: boolean;
  }[];
  refine: (value: string) => void;
}

const CustomRefinementListComponent: React.FC<CustomRefinementListProps> = ({ items, refine }) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {items.map((item) => (
        <Chip
          key={item.label}
          label={`${item.label} (${item.count})`}
          onClick={() => refine(item.value)}
          color={item.isRefined ? 'primary' : 'default'}
          variant={item.isRefined ? 'filled' : 'outlined'}
          style={{ margin: '4px' }}
        />
      ))}
    </Stack>
  );
};

export const CustomRefinementList = connectRefinementList(CustomRefinementListComponent);
