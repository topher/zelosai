// app/components/SidebarProfiles.tsx
"use client";

import React from "react";
import FilterSection from "./FilterSection";
import { MultiSelectFilterList, SingleSelectFilterList } from "./FilterList";

const SidebarProfiles: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>Hi there</div>
      <FilterSection title="Athlete Profiles">
        <SingleSelectFilterList attribute="sport" />
        <SingleSelectFilterList attribute="location.keyword" />
        <MultiSelectFilterList attribute="hobbies" />
        <MultiSelectFilterList attribute="languages_spoken" />
        <SingleSelectFilterList attribute="code" />
      </FilterSection>
    </div>
  );
};

export default SidebarProfiles;
