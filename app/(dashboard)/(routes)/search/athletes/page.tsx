// app/(dashboard)/(routes)/search/athletes/page.tsx

"use client";

import React from "react";
import SearchPageLayout from "@/app/components/atomic/templates/SearchPageLayout";
import ProfileSearchCard from "@/app/(dashboard)/(routes)/search/components/ProfileSearchCard";

const AthleteSearchPage: React.FC = () => {
  const searchSettings = {
    search_attributes: ["name", "sport", "location", "hobbies", "languages_spoken"],
    result_attributes: [
      "name",
      "sport",
      "noc",
      "hobbies",
      "languages_spoken",
      "imageSrc",
      "id",
      "accolades",
      "similarity_score",
    ],
    highlight_attributes: ["name"],
    facet_attributes: [
      { attribute: "sport", field: "sport", type: "string" },
      { attribute: "location", field: "noc", type: "string" },
      { attribute: "hobbies", field: "hobbies", type: "string" },
      { attribute: "languages_spoken", field: "languages_spoken", type: "string" },
    ],
  };

  return (
    <SearchPageLayout
      header={{
        title: "Athlete Profiles",
        description: "Browse and search through a comprehensive list of athlete profiles.",
      }}
      indexName="athletes_triples"
      searchSettings={searchSettings}
      placeholder="Search for profiles..."
      sidebarSection="Athlete Profiles"
      HitComponent={ProfileSearchCard}
    />
  );
};

export default AthleteSearchPage;
