// /app/components/atomic/templates/SearchPageLayout.tsx

"use client";

import React, { useState, useRef } from "react";
import {
  InstantSearch,
  Configure,
  useHits,
} from "react-instantsearch-hooks-web";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme";
import SidebarToggle from "../../../(dashboard)/(routes)/search/components/SidebarToggle";
import ResponsiveSidebar from "../../../(dashboard)/(routes)/search/components/ResponsiveSidebar";
import CustomSearchBox from "../../../(dashboard)/(routes)/search/components/CustomSearchBox";
import CustomPagination from "../../../(dashboard)/(routes)/search/components/CustomPagination";
import { SearchParameters } from "algoliasearch-helper";
import Searchkit from "searchkit";
import Client from "@searchkit/instantsearch-client";
import FeaturePageHeader from "../molecules/FeaturePageHeader";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

interface SearchPageLayoutProps {
  header: PageHeaderProps;
  indexName: string;
  searchSettings: any;
  placeholder: string;
  sidebarSection: string;
  HitComponent: React.FC<{ data: any }>;
  extractId?: (hit: any) => string;
  isLoading?: boolean;
  error?: string | null;
}

const SearchPageLayout: React.FC<SearchPageLayoutProps> = ({
  header,
  indexName,
  searchSettings,
  placeholder,
  sidebarSection,
  HitComponent,
  extractId,
  isLoading = false,
  error = null,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hitsPerPage, setHitsPerPage] = useState(16);

  const sk = new Searchkit({
    connection: { host: "http://localhost:9200" },
    search_settings: searchSettings,
  });

  const searchClient = Client(sk);

  const HitsComponent: React.FC = () => {
    const { hits } = useHits();

    if (!hits || hits.length === 0) {
      return <div className="text-white">No results found.</div>;
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

        <div className="flex h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-indigo-900">
          {/* Sidebar */}
          <ResponsiveSidebar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(false)}
            sections={[sidebarSection]}
            hitsPerPage={hitsPerPage}
            onChangeHitsPerPage={setHitsPerPage}
          />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            {/* Feature Header */}
            <div className="sticky top-0 z-10">
              <FeaturePageHeader
                title={header.title}
                description={header.description}
                actions={
                  <SidebarToggle toggleSidebar={() => setIsSidebarOpen(true)} />
                }
              />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 px-6 pb-6">
              {/* Loading State */}
              {isLoading && <p className="text-white">Loading...</p>}

              {/* Error State */}
              {error && <p className="text-red-500">{error}</p>}

              {!isLoading && !error && (
                <>
                  {/* Top Pagination */}
                  <div className="mt-1 mb-6 flex justify-end">
                    <CustomPagination />
                  </div>

                  <div className="mb-6">
                    <CustomSearchBox placeholder={placeholder} />
                  </div>

                  <div className="mb-6">
                    <HitsComponent />
                  </div>

                  {/* Bottom Pagination */}
                  <div className="mt-6">
                    <CustomPagination />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </InstantSearch>
    </ThemeProvider>
  );
};

export default SearchPageLayout;
