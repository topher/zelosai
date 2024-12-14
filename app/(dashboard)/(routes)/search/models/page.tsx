// app/(dashboard)/(routes)/search/models/page.tsx

"use client";

import React from "react";
import SearchPageLayout from "@/app/components/atomic/templates/SearchPageLayout";
// import AIModelSearchCard from "@/app/(dashboard)/(routes)/search/components/AIModelSearchCard";
import SearchCard from "../components/SearchCard";

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
      header={{
        title: "Models",
        description: "Browse and search through a list of AI models.",
      }}
      indexName="complete_trained_models"
      searchSettings={searchSettings}
      placeholder="Search for models..."
      sidebarSection="AI Models"
      HitComponent={SearchCard}
      type="model"
    />
  );
};

export default AIModelSearchPage;
