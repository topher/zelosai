// app/components/Sidebar.tsx

"use client";

import React from "react";
import FilterSection from "./FilterSection";
import { MultiSelectFilterList, SingleSelectFilterList } from "./FilterList";

const Sidebar: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Athlete Profiles Filters */}
      <FilterSection title="Athlete Profiles">
        <SingleSelectFilterList attribute="sport" />
        <SingleSelectFilterList attribute="country" />
        <SingleSelectFilterList attribute="team_or_club" />
        <MultiSelectFilterList attribute="interests_hobbies" />
      </FilterSection>

      {/* Contracts Filters */}
      <FilterSection title="Contracts">
        <MultiSelectFilterList attribute="tags" />
        <SingleSelectFilterList attribute="status" />
        <SingleSelectFilterList attribute="rights" />
      </FilterSection>

      {/* AI Models Filters */}
      <FilterSection title="AI Models">
        <MultiSelectFilterList attribute="tags" />
        <SingleSelectFilterList attribute="default_language" />
      </FilterSection>

      {/* Brands Filters */}
      <FilterSection title="Brands">
        {/* <SingleSelectFilterList attribute="industries" /> */}
        <MultiSelectFilterList attribute="regions" />
        <MultiSelectFilterList attribute="audience_lifestyle" />
        <MultiSelectFilterList attribute="languages" />
        {/* Add more filters as needed */}
      </FilterSection>

    </div>
  );
};

export default Sidebar;
