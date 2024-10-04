// app/contracts/page.tsx

"use client";

import React, { useState } from "react";
import {
  InstantSearch,
  useHits,
  Configure,
} from "react-instantsearch-hooks-web";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme";
import SidebarToggle from "@/app/components/SidebarToggle";
import SidebarContracts from "@/app/components/SidebarContracts";
import ContractSearchCard from "@/app/components/ContractSearchCard";
import CustomSearchBox from "@/app/components/CustomSearchBox";
import CustomPagination from "@/app/components/CustomPagination";
import { SearchParameters } from "algoliasearch-helper";

const sk = new Searchkit({
  connection: {
    host: "http://localhost:9200",
  },
  search_settings: {
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
  },
});

const searchClient = Client(sk);

const ContractHits: React.FC = () => {
  const { hits } = useHits();

  if (!hits || hits.length === 0) {
    return <div>No contracts found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {hits.map((hit: any) => (
        <ContractSearchCard key={hit.id} data={hit} />
      ))}
    </div>
  );
};

const ContractSearchPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hitsPerPage, setHitsPerPage] = useState(16); // Default value

  return (
    <ThemeProvider theme={theme}>
      <InstantSearch indexName="contracts" searchClient={searchClient}>
        {/* Configure component to set hitsPerPage */}
        <Configure {...({ hitsPerPage } as SearchParameters)} />

        <div className="flex w-full h-screen relative">
          {/* Sidebar Toggle Button for Small Screens */}
          <div className="absolute top-4 left-4 lg:hidden z-10">
            <SidebarToggle
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>

          {/* Sidebar */}
          {isSidebarOpen && (
            <div
              className="w-64 p-4 shadow-lg overflow-y-auto hidden lg:block"
              style={{
                backgroundColor: 'rgba(245, 245, 245, 0.9)',
                backgroundImage: 'linear-gradient(to right, rgba(245, 245, 245, 0.5) 50%, rgba(255, 255, 255, 0)), url("/bg-marble.jpg")',
                backgroundPosition: 'top left',
                backgroundRepeat: 'repeat',
                backgroundAttachment: 'fixed',
                backgroundSize: 'fixed',
                backdropFilter: 'blur(10px)',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              }}
            >
              <SidebarContracts
                hitsPerPage={hitsPerPage}
                onChangeHitsPerPage={(value) => setHitsPerPage(value)}
              />
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Page Title and Top Pagination */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-darkGray">Contracts</h1>
              <div className="hidden sm:block">
                <CustomPagination />
              </div>
            </div>
            <CustomSearchBox placeholder="Search for contracts..." />
            <ContractHits />
            <div className="mt-6">
              <CustomPagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </ThemeProvider>
  );
};

export default ContractSearchPage;
