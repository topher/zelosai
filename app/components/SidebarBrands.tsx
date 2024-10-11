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
        <SingleSelectFilterList attribute="industries" />
        <MultiSelectFilterList attribute="regions" />
        <MultiSelectFilterList attribute="audience_lifestyle" />
        <MultiSelectFilterList attribute="languages" />
        {/* Add more filters as needed */}
      </FilterSection>

    </div>
  );
};

export default SidebarBrands;
