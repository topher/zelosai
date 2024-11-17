// app/(dashboard)/(routes)/search/contracts/page.tsx

"use client";

import React from "react";
import SearchPageLayout from "@/app/components/atomic/templates/SearchPageLayout";
// import ContractSearchCard from "@/app/(dashboard)/(routes)/search/components/ContractSearchCard";
import SearchCard from "../components/SearchCard";

const ContractSearchPage: React.FC = () => {
  const searchSettings = {
    search_attributes: ["title", "status", "tags", "rights"],
    result_attributes: [
      "title",
      "status",
      "tags",
      "rights",
      "effectiveDate",
      "expirationDate",
      "id",
    ],
    highlight_attributes: ["title"],
    facet_attributes: [
      { attribute: "tags", field: "tags", type: "string" },
      { attribute: "status", field: "status", type: "string" },
      { attribute: "rights", field: "rights", type: "string" },
    ],
  };

  return (
    <SearchPageLayout
      header={{
        title: "Contracts",
        description: "Browse and search through a comprehensive list of contracts.",
      }}
      indexName="contracts"
      searchSettings={searchSettings}
      placeholder="Search for contracts..."
      sidebarSection="Contracts"
      HitComponent={SearchCard}
      type="contract"
    />
  );
};

export default ContractSearchPage;
