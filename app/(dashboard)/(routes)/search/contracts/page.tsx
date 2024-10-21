// app/(dashboard)/(routes)/search/contracts/page.tsx

"use client";

import React from "react";
import SearchPageLayout from "@/app/components/SearchPageLayout";
import ContractSearchCard from "@/app/components/ContractSearchCard";

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
      indexName="contracts"
      searchSettings={searchSettings}
      pageTitle="Contracts"
      placeholder="Search for contracts..."
      sidebarSection="Contracts"
      HitComponent={ContractSearchCard}
    />
  );
};

export default ContractSearchPage;
