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
import SidebarBrands from "@/app/components/SidebarBrands"; // You'll need to create this component

const sk = new Searchkit({
  connection: {
    host: "http://localhost:9200",
  },
  search_settings: {
    search_attributes: ["brand_name", "industry.Primary_Industry", "mission_vision"],
    result_attributes: [
      "brand_name",
      "logo_url",
      "industry",
      "mission_vision",
      "id",
    ],
    highlight_attributes: ["brand_name"],
    facet_attributes: [
      { attribute: "industry.Primary_Industry", field: "industry.Primary_Industry", type: "string" },
      { attribute: "regions", field: "regions", type: "string" },
      // Add more facets as needed
    ],
  },
});

const searchClient = Client(sk) as unknown as any;

const BrandHits = () => {
  const { hits } = useHits();

  if (!hits || hits.length === 0) {
    return <div>No brands found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {hits.map((hit: any) => (
        <BrandSearchCard key={hit.id} data={hit} />
      ))}
    </div>
  );
};

const BrandSearchPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <InstantSearch indexName="brands" searchClient={searchClient}>
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
