// /app/(dashboard)/(routes)/search/components/SearchPageLayout.tsx

"use client";

import React, { useState, useRef } from "react";
import {
  InstantSearch,
  Configure,
  useHits,
} from "react-instantsearch-hooks-web";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme";
import SidebarToggle from "./SidebarToggle";
import ResponsiveSidebar from "./ResponsiveSidebar";
import CustomSearchBox from "./CustomSearchBox";
import CustomPagination from "./CustomPagination";
import { SearchParameters } from "algoliasearch-helper";
import Searchkit from "searchkit";
import Client from "@searchkit/instantsearch-client";

interface SearchPageLayoutProps {
  indexName: string;
  searchSettings: any;
  pageTitle: string;
  placeholder: string;
  sidebarSection: string;
  HitComponent: React.FC<{ data: any }>;
  extractId?: (hit: any) => string;
}

const SearchPageLayout: React.FC<SearchPageLayoutProps> = ({
  indexName,
  searchSettings,
  pageTitle,
  placeholder,
  sidebarSection,
  HitComponent,
  extractId,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed for small screens
  const [hitsPerPage, setHitsPerPage] = useState(16);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const sk = new Searchkit({
    connection: { host: "http://localhost:9200" },
    search_settings: searchSettings,
  });

  const searchClient = Client(sk);

  const HitsComponent: React.FC = () => {
    const { hits } = useHits();

    if (!hits || hits.length === 0) {
      return <div>No results found.</div>;
    }

    return (
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {hits.map((hit: any) => {
          let id = hit.id;

          if (extractId) {
            id = extractId(hit);
          }

          return <HitComponent key={id} data={{ ...hit, id }} />;
        })}
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Configure {...({ hitsPerPage } as SearchParameters)} />

        <div className="flex w-full h-screen relative">
          {/* Responsive Sidebar */}
          <ResponsiveSidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(false)}
            sections={[sidebarSection]}
            hitsPerPage={hitsPerPage}
            onChangeHitsPerPage={setHitsPerPage}
          />

          {/* Main content */}
          <div ref={mainContentRef} className="flex-1 p-4 overflow-y-auto">
            {/* Page Title and Top Pagination */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-darkGray ml-4">
                  {pageTitle}
                </h1>
                {/* Sidebar Toggle Button for Small Screens */}
                <div className="lg:hidden ml-2">
                  <SidebarToggle toggleSidebar={() => setIsSidebarOpen(true)} />
                </div>
              </div>
              <div className="hidden sm:block">
                <CustomPagination onPageChange={scrollToTop} />
              </div>
            </div>
            <CustomSearchBox placeholder={placeholder} />
            <HitsComponent />
            <div className="mt-6">
              <CustomPagination onPageChange={scrollToTop} />
            </div>
          </div>
        </div>
      </InstantSearch>
    </ThemeProvider>
  );
};

export default SearchPageLayout;
