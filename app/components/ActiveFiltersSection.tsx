// app/components/ActiveFiltersSection.tsx

"use client";

import React from "react";
import ActiveFilters from "./ActiveFilters"; // Ensure correct import

const ActiveFiltersSection: React.FC = () => {
  return (
    <div className="mb-4">
      <ActiveFilters />
    </div>
  );
};

export default ActiveFiltersSection;
