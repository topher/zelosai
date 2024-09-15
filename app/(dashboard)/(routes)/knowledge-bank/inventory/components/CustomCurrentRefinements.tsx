// components/CustomCurrentRefinements.tsx

'use client';

import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import { Chip, Stack } from '@mui/material';

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
  const chips = items.flatMap((item) =>
    item.refinements?.map((refinement) => (
      <Chip
        key={`${item.attribute}-${refinement.label}`}
        label={`${item.label}: ${refinement.label}`}
        onDelete={() => item.refine(refinement)}
        color="primary"
        variant="filled"
        style={{ margin: '4px' }}
      />
    )) ?? []
  );

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" style={{ marginBottom: '16px' }}>
      {chips}
    </Stack>
  );
};

export const CustomCurrentRefinements = connectCurrentRefinements(CustomCurrentRefinementsComponent);
