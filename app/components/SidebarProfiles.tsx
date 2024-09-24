// app/components/SidebarProfiles.tsx

"use client";

import React from "react";
import { ClearRefinements } from "react-instantsearch-hooks-web";
import FilterSection from "./FilterSection";
import { MultiSelectFilterList, SingleSelectFilterList } from "./FilterList";

const SidebarProfiles: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Filters Title and Reset Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-darkGray">Filters</h2>
        <ClearRefinements
          translations={{
            resetButtonText: "Reset Filters",
          }}
          classNames={{
            root: "flex",
            button:
              "text-indigo hover:text-indigo-light focus:outline-none focus:underline",
            disabledButton: "text-gray-400 cursor-not-allowed",
          }}
        />
      </div>

      {/* Sport Filter */}
      <FilterSection title="Sport">
        <MultiSelectFilterList attribute="sport" />
      </FilterSection>

      {/* Location Filter */}
      <FilterSection title="Location">
        <MultiSelectFilterList attribute="location" />
      </FilterSection>
    </div>
  );
};

export default SidebarProfiles;
