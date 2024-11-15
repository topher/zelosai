// /app/(dashboard)/(routes)/search/components/Sidebar.tsx

"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ClearRefinements } from "react-instantsearch-hooks-web";
import FilterSection from "./FilterSection";
import {
  MultiSelectFilterList,
  SingleSelectFilterList,
} from "./FilterList";
import ResultsPerPageSlider from "./ResultsPerPageSlider";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  sections: string[];
  hitsPerPage: number;
  onChangeHitsPerPage: (value: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  sections,
  hitsPerPage,
  onChangeHitsPerPage,
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const modelTypeTags = ["image", "text", "voice", "foundational"];

  const sidebarContent = (
    <div className="w-64 p-4 space-y-4 overflow-y-auto bg-gray-800 text-white h-full">
      {/* Filters Title and Reset Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`ml-4 text-2xl font-bold ${montserrat.className}`}>Filters</h2>
        <ClearRefinements
          translations={{
            resetButtonText: "Reset Filters",
          }}
          classNames={{
            button:
              "text-sm text-gray-400 hover:text-white focus:outline-none",
            disabledButton: "text-gray-600 cursor-not-allowed",
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
            <SingleSelectFilterList attribute="sport" />
          </FilterSection>
          <FilterSection title="Country">
            <SingleSelectFilterList attribute="location" />
          </FilterSection>
          <FilterSection title="Hobbies">
            <MultiSelectFilterList attribute="hobbies" />
          </FilterSection>
          <FilterSection title="Languages Spoken">
            <MultiSelectFilterList attribute="languages_spoken" />
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

      {/* Brands Filters */}
      {sections.includes("Brands") && (
        <>
          <FilterSection title="Industries">
            <SingleSelectFilterList attribute="industries" />
          </FilterSection>
          <FilterSection title="Regions">
            <MultiSelectFilterList attribute="regions" />
          </FilterSection>
          <FilterSection title="Audience Lifestyle">
            <MultiSelectFilterList attribute="audience_lifestyle" />
          </FilterSection>
          <FilterSection title="Languages">
            <MultiSelectFilterList attribute="languages" />
          </FilterSection>
        </>
      )}
    </div>
  );

  if (isLargeScreen) {
    // Persistent Sidebar for Large Screens
    return (
      <div className="w-64 h-full flex-none">
        {sidebarContent}
      </div>
    );
  } else {
    // Temporary Drawer for Small Screens
    return (
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          style: { width: '256px', backgroundColor: '#1F2937' },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }
};

export default Sidebar;
