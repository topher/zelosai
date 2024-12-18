// app/hooks/useNestedRefinementList.ts

import { useState, useEffect } from "react";
import { useSearchkit } from "@searchkit/client";

interface NestedRefinementListProps {
  attribute: string;
  predicate: string;
}

interface RefinementItem {
  label: string;
  value: string;
  count: number;
  isRefined: boolean;
}

export const useNestedRefinementList = ({
  attribute,
  predicate,
}: NestedRefinementListProps) => {
  const api = useSearchkit();
  const [items, setItems] = useState<RefinementItem[]>([]);
  const [canRefine, setCanRefine] = useState<boolean>(false);

  // Function to refine the search based on selected value
  const refine = (value: string) => {
    const currentFilters = api.getFilters();

    // Check if the filter is already applied
    const isAlreadyRefined = currentFilters.some(
      (filter) =>
        filter.identifier === attribute &&
        filter.value === value &&
        filter.predicate === predicate
    );

    let newFilters;

    if (isAlreadyRefined) {
      // Remove the filter
      newFilters = currentFilters.filter(
        (filter) =>
          !(
            filter.identifier === attribute &&
            filter.value === value &&
            filter.predicate === predicate
          )
      );
    } else {
      // Add the filter
      newFilters = [
        ...currentFilters,
        {
          identifier: attribute,
          value,
          predicate,
          level: "nested",
        },
      ];
    }

    api.setFilters(newFilters);
    api.search();
  };

  useEffect(() => {
    // Subscribe to search results updates
    const subscription = api.subscribe(() => {
      const facet = api.getFacet(attribute);

      if (facet && facet.entries) {
        setItems(
          facet.entries.map((entry) => ({
            label: entry.label,
            value: entry.label,
            count: entry.count,
            isRefined: entry.isSelected,
          }))
        );
        setCanRefine(facet.entries.length > 0);
      }
    });

    // Initial fetch
    api.search();

    return () => {
      subscription.unsubscribe();
    };
  }, [api, attribute]);

  return {
    items,
    refine,
    canRefine,
  };
};
