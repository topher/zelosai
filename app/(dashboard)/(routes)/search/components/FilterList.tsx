// /app/(dashboard)/(routes)/search/components/FilterList.tsx

"use client";

import React from "react";
import {
  useRefinementList,
  UseRefinementListProps,
  useMenu,
} from "react-instantsearch-hooks-web";
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
  const languageAttributes = ["default_language", "language"];
  // Attributes that use country codes
  const countryAttributes = ["location", "country"];
  // Attributes that use sport codes
  const sportAttributes = ["sport"];

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
    operator: operator ?? "or",
    transformItems,
    ...rest,
  });

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => refine(item.value)}
          className={`px-3 py-1 rounded-md border text-sm font-medium ${
            item.isRefined
              ? "bg-indigo-500 text-white border-indigo-500"
              : "bg-gray-700 text-gray-200 border-gray-700 hover:bg-gray-600"
          } transition-colors`}
        >
          {mapLabel(attribute, item.label)}
        </button>
      ))}
    </div>
  );
};

export const SingleSelectFilterList: React.FC<SingleSelectFilterListProps> = ({
  attribute,
}) => {
  const { items, refine } = useMenu({
    attribute,
  });

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => refine(item.value)}
          className={`px-3 py-1 rounded-md border text-sm font-medium ${
            item.isRefined
              ? "bg-indigo-500 text-white border-indigo-500"
              : "bg-gray-700 text-gray-200 border-gray-700 hover:bg-gray-600"
          } transition-colors`}
        >
          {mapLabel(attribute, item.label)}
        </button>
      ))}
    </div>
  );
};