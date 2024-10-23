// app/(dashboard)/(routes)/search/athletes/page.tsx

"use client";

import React from "react";
import SearchPageLayout from "@/app/(dashboard)/(routes)/search/components/SearchPageLayout";
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
      indexName="athletes_triples"
      searchSettings={searchSettings}
      pageTitle="Athlete Profiles"
      placeholder="Search for profiles..."
      sidebarSection="Athlete Profiles"
      HitComponent={ProfileSearchCard}
    />
  );
};

export default AthleteSearchPage;
