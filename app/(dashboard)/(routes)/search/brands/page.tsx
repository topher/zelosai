// @/app/(dashboard)/(routes)/search/brands/page.tsx
"use client";

import React, { useState } from "react";
import {
  InstantSearch,
  SearchBox,
  Pagination,
} from "react-instantsearch-hooks-web";
import { useHits } from "react-instantsearch-hooks-web";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import BrandSearchCard from "@/app/components/BrandSearchCard";
import SidebarToggle from "@/app/components/SidebarToggle";
import theme from "@/app/theme";
import { ThemeProvider } from "@mui/material/styles";
import SidebarBrands from "@/app/components/SidebarBrands";

const sk = new Searchkit({
  connection: {
    host: "http://localhost:9200",
  },
  search_settings: {
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
      "company_name"
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
      "subject" // Include 'subject' as it's your unique identifier
    ],
    highlight_attributes: ["brand_name", "body_text"],
    facet_attributes: [
      { attribute: "industries", field: "primary_industry", type: "string" },
      { attribute: "regions", field: "regions", type: "string" },
      { attribute: "audience_lifestyle", field: "audience_lifestyle", type: "string" },
      { attribute: "languages", field: "languages", type: "string" }
      // Add more facets as needed
    ],
  },
});



const searchClient = Client(sk) as unknown as any;


interface Hit {
  subject: string; // e.g., "http://zelos.ai/knowledge/maz_203"
  brand_name?: string;
  logo_url?: string | null;
  primary_industry?: string;
  secondary_industry?: string;
  mission_vision?: string;
  regions?: string[];
  languages?: string[];
  [key: string]: any
}

const BrandHits: React.FC = () => {
  const { hits } = useHits<Hit>();

  if (!hits || hits.length === 0) {
    return <div>No brands found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {hits.map((hit) => {
        // Extract the ID from the subject URI
        const uriSegments = hit.subject.split("/");
        const id = uriSegments[uriSegments.length - 1]; // "maz_203"

        return <BrandSearchCard key={id} data={{ ...hit, id }} />;
      })}
    </div>
  );
};

const BrandSearchPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <InstantSearch indexName="brands_triples" searchClient={searchClient}>
        <div className="flex w-full h-full relative">
          {/* Sidebar Toggle Button for Small Screens */}
          <div className="absolute top-4 left-4 lg:hidden z-10">
            <SidebarToggle
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>

          {/* Sidebar */}
          {isSidebarOpen && (
            <div className="w-64 p-4 bg-gray-100 border-r overflow-y-auto">
              <SidebarBrands />
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <SearchBox />
            <BrandHits />
            <Pagination />
          </div>
        </div>
      </InstantSearch>
    </ThemeProvider>
  );
};

export default BrandSearchPage;
