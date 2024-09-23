// app/components/SidebarProfiles.tsx

"use client";

import React from "react";
import FilterSection from "./FilterSection";
import { MultiSelectFilterList, SingleSelectFilterList } from "./FilterList";

const SidebarProfiles: React.FC = () => {
  return (
    <div className="space-y-4">
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
