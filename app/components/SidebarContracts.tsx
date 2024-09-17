// app/components/SidebarContracts.tsx

"use client";

import React from "react";
import FilterSection from "./FilterSection";
import { MultiSelectFilterList, SingleSelectFilterList } from "./FilterList";

const SidebarContracts: React.FC = () => {
  return (
    <div className="space-y-4">
      <FilterSection title="Tags">
        <MultiSelectFilterList attribute="tags" />
      </FilterSection>
      <FilterSection title="Status">
        <SingleSelectFilterList attribute="status" />
      </FilterSection>
      <FilterSection title="Rights">
        <SingleSelectFilterList attribute="rights" />
      </FilterSection>
    </div>
  );
};

export default SidebarContracts;
