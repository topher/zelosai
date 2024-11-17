// app/(dashboard)/(routes)/search/brands/page.tsx

"use client";

import React from "react";
import SearchPageLayout from "@/app/components/atomic/templates/SearchPageLayout";
// import BrandSearchCard from "@/app/(dashboard)/(routes)/search/components/BrandSearchCard";
import SearchCard from "../components/SearchCard";

const BrandSearchPage: React.FC = () => {
  const searchSettings = {
    search_attributes: [
      "brand_name",
      "logo_url",
      "primary_industry",
      "secondary_industry",
      "mission_vision",
      "regions",
      "languages",
      "key_partners",
      "key_activities",
      "value_propositions",
      "customer_segments",
      "link",
      "parsed_at",
      "country",
      "category",
      "body_text",
      "infobox",
      "company_name",
    ],
    result_attributes: [
      "brand_name",
      "logo_url",
      "primary_industry",
      "secondary_industry",
      "mission_vision",
      "regions",
      "languages",
      "key_partners",
      "key_activities",
      "value_propositions",
      "customer_segments",
      "link",
      "parsed_at",
      "country",
      "category",
      "body_text",
      "infobox",
      "company_name",
      "subject", // Include 'subject' as it's your unique identifier
    ],
    highlight_attributes: ["brand_name", "body_text"],
    facet_attributes: [
      { attribute: "industries", field: "primary_industry", type: "string" },
      { attribute: "regions", field: "regions", type: "string" },
      { attribute: "audience_lifestyle", field: "audience_lifestyle", type: "string" },
      { attribute: "languages", field: "languages", type: "string" },
    ],
  };

  // Function to extract ID from hit.subject
  const extractIdFromSubject = (hit: any) => {
    const uriSegments = hit.subject.split("/");
    return uriSegments[uriSegments.length - 1];
  };

  return (
    <SearchPageLayout
      header={{
        title: "Brands",
        description: "Browse and search through a comprehensive list of brand profiles.",
      }}
      indexName="brands_triples"
      searchSettings={searchSettings}
      placeholder="Search for brands..."
      sidebarSection="Brands"
      HitComponent={SearchCard}
      type="brand"
      extractId={extractIdFromSubject}
    />
  );
};

export default BrandSearchPage;
