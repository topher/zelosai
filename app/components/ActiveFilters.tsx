"use client";

import React from "react";
import { useCurrentRefinements, useClearRefinements } from "react-instantsearch-hooks-web";
import { Chip, Stack, Typography, Button } from "@mui/material";

const ActiveFilters: React.FC = () => {
  const { items, refine } = useCurrentRefinements();
  const { refine: clearRefinements } = useClearRefinements();

  if (!items || items.length === 0) return null;

  const handleClearAll = () => {
    clearRefinements(); // Correct way to clear all refinements
  };

  return (
    <div className="mb-4">
      <Typography variant="h6" className="mb-2">
        Active Filters
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {items.map((item) =>
          item.refinements.map((refinement) => (
            <Chip
              key={`${item.attribute}-${refinement.label}`}
              label={`${item.label}: ${refinement.label}`}
              onDelete={() => refine(refinement)}
              color="primary"
              variant="filled"
              style={{ margin: "4px" }}
            />
          ))
        )}
      </Stack>
      <Button variant="outlined" onClick={handleClearAll} className="mt-2">
        Clear All
      </Button>
    </div>
  );
};

export default ActiveFilters;
