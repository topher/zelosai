// app/components/SidebarBrands.tsx

"use client";

import React from "react";
import FilterSection from "./FilterSection";
import { MultiSelectFilterList, SingleSelectFilterList } from "./FilterList";

const SidebarBrands: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Brands Filters */}
      <FilterSection title="Brands">
        <SingleSelectFilterList attribute="industry.Primary_Industry" />
        <MultiSelectFilterList attribute="regions" />
        {/* Add more brand-specific filters as needed */}
        <MultiSelectFilterList attribute="interests" />
        <SingleSelectFilterList attribute="size" />
      </FilterSection>
    </div>
  );
};

export default SidebarBrands;
