// models/page.tsx

"use client";

import React, { useState } from "react";
import { InstantSearch, useHits } from "react-instantsearch-hooks-web";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme";
import SidebarToggle from "@/app/components/SidebarToggle";
import SidebarAIModels from "@/app/components/SidebarAIModels";
import AIModelSearchCard from "@/app/components/AIModelSearchCard";
import CustomSearchBox from "@/app/components/CustomSearchBox";
import CustomPagination from "@/app/components/CustomPagination";

const sk = new Searchkit({
  connection: {
    host: "http://localhost:9200",
  },
  search_settings: {
    search_attributes: ["label", "description", "default_language"],
    result_attributes: ["label", "description", "thumbnail", "default_language", "tags", "iconName", "id"],
    highlight_attributes: ["label"],
    facet_attributes: [
      { attribute: "tags", field: "tags", type: "string" },
      { attribute: "default_language", field: "default_language", type: "string" },
    ],
  },
});

const searchClient = Client(sk) as unknown as any;

const AIModelHits = () => {
  const { hits } = useHits();

  if (!hits || hits.length === 0) {
    return <div>No AI models found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {hits.map((hit: any) => (
        <AIModelSearchCard key={hit.id} data={hit} />
      ))}
    </div>
  );
};

const AIModelSearchPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <InstantSearch indexName="complete_trained_models" searchClient={searchClient}>
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
            <div className="w-64 p-4 bg-offWhite border-r shadow-lg overflow-y-auto hidden lg:block">
              <SidebarAIModels />
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Page Title and Top Pagination */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-darkGray">
                Models
              </h1>
              <div className="hidden sm:block">
                <CustomPagination />
              </div>
            </div>
            <CustomSearchBox placeholder="Search for models..." />
            <AIModelHits />
            <div className="mt-6">
              <CustomPagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </ThemeProvider>
  );
};

export default AIModelSearchPage;
