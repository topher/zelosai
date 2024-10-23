// app/components/SearchPageLayout.tsx

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
import Sidebar from "./Sidebar";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
                backgroundColor: "rgba(245, 245, 245, 0.9)",
                backgroundImage:
                  'linear-gradient(to right, rgba(245, 245, 245, 0.5) 50%, rgba(255, 255, 255, 0)), url("/bg-marble.jpg")',
                backgroundPosition: "top left",
                backgroundRepeat: "repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "fixed",
                backdropFilter: "blur(10px)",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
            >
              <Sidebar
                sections={[sidebarSection]}
                hitsPerPage={hitsPerPage}
                onChangeHitsPerPage={setHitsPerPage}
              />
            </div>
          )}

          {/* Main content */}
          <div ref={mainContentRef} className="flex-1 p-4 overflow-y-auto">
            {/* Page Title and Top Pagination */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-darkGray ml-4">
                {pageTitle}
              </h1>
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
