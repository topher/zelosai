// app/components/FilterList.tsx

"use client";

import React from "react";
import {
  useRefinementList,
  useMenu,
} from "react-instantsearch-hooks-web";
import { Chip, Stack } from "@mui/material";

interface MultiSelectFilterListProps {
  attribute: string;
}

interface SingleSelectFilterListProps {
  attribute: string;
}

export const MultiSelectFilterList: React.FC<MultiSelectFilterListProps> = ({
  attribute,
}) => {
  const { items, refine } = useRefinementList({
    attribute,
    operator: 'or', // Allows multiple selections
  });

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {items.map((item) => (
        <Chip
          key={item.label}
          label={`${item.label} (${item.count})`}
          onClick={() => refine(item.value)}
          color={item.isRefined ? "primary" : "default"}
          variant={item.isRefined ? "filled" : "outlined"}
          style={{ margin: "4px" }}
        />
      ))}
    </Stack>
  );
};

export const SingleSelectFilterList: React.FC<SingleSelectFilterListProps> = ({
  attribute,
}) => {
  const { items, refine } = useMenu({
    attribute,
  });

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {items.map((item) => (
        <Chip
          key={item.label}
          label={`${item.label} (${item.count})`}
          onClick={() => (item.isRefined ? refine('') : refine(item.value))}
          color={item.isRefined ? "primary" : "default"}
          variant={item.isRefined ? "filled" : "outlined"}
          style={{ margin: "4px" }}
        />
      ))}
    </Stack>
  );
};
