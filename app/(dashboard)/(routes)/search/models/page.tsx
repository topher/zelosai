// app/(dashboard)/(routes)/search/models/page.tsx

"use client";

import React from "react";
import SearchPageLayout from "@/app/(dashboard)/(routes)/search/components/SearchPageLayout";
import AIModelSearchCard from "@/app/(dashboard)/(routes)/search/components/AIModelSearchCard";

const AIModelSearchPage: React.FC = () => {
  const searchSettings = {
    search_attributes: ["label", "description", "default_language"],
    result_attributes: [
      "label",
      "description",
      "thumbnail",
      "default_language",
      "tags",
      "iconName",
      "id",
    ],
    highlight_attributes: ["label"],
    facet_attributes: [
      { attribute: "tags", field: "tags", type: "string" },
      { attribute: "default_language", field: "default_language", type: "string" },
    ],
  };

  return (
    <SearchPageLayout
      indexName="complete_trained_models"
      searchSettings={searchSettings}
      pageTitle="Models"
      placeholder="Search for models..."
      sidebarSection="AI Models"
      HitComponent={AIModelSearchCard}
    />
  );
};

export default AIModelSearchPage;
