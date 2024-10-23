// app/components/FilterList.tsx

"use client";

import React from "react";
import {
  useRefinementList,
  UseRefinementListProps,
  useMenu,
} from "react-instantsearch-hooks-web";
import { Chip, Stack } from "@mui/material";
import { languageMap, countryMap, sportsMap } from "lib/utils";

interface MultiSelectFilterListProps
  extends Omit<UseRefinementListProps, "attribute"> {
  attribute: string;
}

interface SingleSelectFilterListProps {
  attribute: string;
}

// Helper function to map labels
const mapLabel = (attribute: string, label: string): React.ReactNode => {
  // Attributes that use language codes
  const languageAttributes = ["default_language", "language"]; // Add more if needed
  // Attributes that use country codes
  const countryAttributes = ["location", "country"]; // Add more if needed
  // Attributes that use sport codes
  const sportAttributes = ["sport"]; // Add more if needed

  if (languageAttributes.includes(attribute)) {
    return languageMap[label] || label;
  }

  if (countryAttributes.includes(attribute)) {
    const country = countryMap[label];
    if (country) {
      // Optionally include the emoji
      return (
        <>
          <span style={{ marginRight: "4px" }}>{country.emoji}</span>
          {country.name}
        </>
      );
    }
    return label;
  }

  if (sportAttributes.includes(attribute)) {
    return sportsMap[label] || label;
  }

  return label;
};

export const MultiSelectFilterList: React.FC<MultiSelectFilterListProps> = ({
  attribute,
  operator,
  transformItems,
  ...rest
}) => {
  const { items, refine } = useRefinementList({
    attribute,
    operator: operator ?? "or", // Allows multiple selections
    transformItems,
    ...rest,
  });

  return (
    <Stack direction="row" flexWrap="wrap">
      {items.map((item) => (
        <Chip
          key={item.label}
          label={mapLabel(attribute, item.label)}
          onClick={() => refine(item.value)}
          sx={{
            margin: "4px",
            backgroundImage: item.isRefined
              ? "linear-gradient(to right, #4b0082, #ff69b4)"
              : "none",
            backgroundColor: item.isRefined ? "transparent" : "white",
            color: item.isRefined ? "white" : "#111827",
            border: "none",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#b366e2",
              color: "white",
            },
          }}
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
    <Stack direction="row" flexWrap="wrap">
      {items.map((item) => (
        <Chip
          key={item.label}
          label={mapLabel(attribute, item.label)}
          onClick={() => refine(item.value)}
          sx={{
            margin: "4px",
            backgroundImage: item.isRefined
              ? "linear-gradient(to right, #4b0082, #ff69b4)"
              : "none",
            backgroundColor: item.isRefined ? "transparent" : "#f4e7c3",
            color: item.isRefined ? "white" : "#111827",
            border: "none",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#b366e2",
              color: "white",
            },
          }}
        />
      ))}
    </Stack>
  );
};
