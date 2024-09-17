// app/components/SidebarAIModels.tsx

"use client";

import React from "react";
import FilterSection from "./FilterSection";
import { MultiSelectFilterList, SingleSelectFilterList } from "./FilterList";

const SidebarAIModels: React.FC = () => {
  return (
    <div className="space-y-4">
      <FilterSection title="Tags">
        <MultiSelectFilterList attribute="tags" />
      </FilterSection>
      <FilterSection title="Default Language">
        <SingleSelectFilterList attribute="default_language" />
      </FilterSection>
    </div>
  );
};

export default SidebarAIModels;
