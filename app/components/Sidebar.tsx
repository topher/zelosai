// app/components/Sidebar.tsx

"use client";

import React from "react";
import { ClearRefinements } from "react-instantsearch-hooks-web";
import FilterSection from "./FilterSection";
import {
  MultiSelectFilterList,
  SingleSelectFilterList,
} from "./FilterList";
import ResultsPerPageSlider from "./ResultsPerPageSlider";

interface SidebarProps {
  sections: string[];
  hitsPerPage: number;
  onChangeHitsPerPage: (value: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  hitsPerPage,
  onChangeHitsPerPage,
}) => {
  // Define the model type tags
  const modelTypeTags = ["image", "text", "voice", "foundational"];

  return (
    <div className="w-56 space-y-4 overflow-x-hidden sticky top-0 px-1 py-2">
      {/* Filters Title and Reset Button */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-darkGray">Filters</h2>
        <ClearRefinements
          translations={{
            resetButtonText: "Reset Filters",
          }}
          classNames={{
            root: "flex-shrink-0",
            button:
              "text-indigo hover:text-indigo-light focus:outline-none focus:underline",
            disabledButton: "text-gray-400 cursor-not-allowed",
          }}
        />
      </div>

      {/* Results Per Page Slider */}
      <ResultsPerPageSlider
        hitsPerPage={hitsPerPage}
        onChangeHitsPerPage={onChangeHitsPerPage}
      />

      {/* Athlete Profiles Filters */}
      {sections.includes("Athlete Profiles") && (
        <>
          <FilterSection title="Sport">
            <MultiSelectFilterList attribute="sport" />
          </FilterSection>
          <FilterSection title="Country">
            <MultiSelectFilterList attribute="location" />
          </FilterSection>
        </>
      )}

      {/* Contracts Filters */}
      {sections.includes("Contracts") && (
        <>
          <FilterSection title="Tags">
            <MultiSelectFilterList attribute="tags" />
          </FilterSection>
          <FilterSection title="Status">
            <SingleSelectFilterList attribute="status" />
          </FilterSection>
          <FilterSection title="Rights">
            <SingleSelectFilterList attribute="rights" />
          </FilterSection>
        </>
      )}

      {/* AI Models Filters */}
      {sections.includes("AI Models") && (
        <>
          {/* Model Type Filter */}
          <FilterSection title="Model Type">
            <MultiSelectFilterList
              attribute="tags"
              transformItems={(items) =>
                items.filter((item) => modelTypeTags.includes(item.label))
              }
            />
          </FilterSection>
          {/* Tags Filter */}
          <FilterSection title="Tags">
            <MultiSelectFilterList
              attribute="tags"
              transformItems={(items) =>
                items.filter((item) => !modelTypeTags.includes(item.label))
              }
            />
          </FilterSection>
          {/* Default Language Filter */}
          <FilterSection title="Default Language">
            <SingleSelectFilterList attribute="default_language" />
          </FilterSection>
        </>
      )}
    </div>
  );
};

export default Sidebar;
