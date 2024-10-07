// app/(dashboard)/(routes)/search/profiles/page.tsx
"use client";

import React, { useState } from "react";
import {
  InstantSearch,
  SearchBox,
  Pagination,
} from "react-instantsearch-hooks-web";
import { useHits } from "react-instantsearch-hooks-web";
import Client from "@searchkit/instantsearch-client";
import ProfileSearchCard from "@/app/components/ProfileSearchCard";
import Searchkit from "searchkit";
import SidebarToggle from "@/app/components/SidebarToggle"; // For toggling the sidebar
import theme from "@/app/theme"; // If using a theme
import { ThemeProvider } from "@mui/material/styles";
import SidebarProfiles from "@/app/components/SidebarProfiles";

const sk = new Searchkit({
  connection: {
    host: "http://localhost:9200",
  },
  search_settings: {
    search_attributes: ["name", "sport", "location"],
    result_attributes: ["name", "sport", "location", "id"],
    highlight_attributes: ["name"],
    facet_attributes: [
      { attribute: "sport", field: "sport", type: "string" },
      { attribute: "location.keyword", field: "location.keyword", type: "string" },
      { attribute: "hobbies", field: "hobbies", type: "string" },
      { attribute: "languages_spoken", field: "languages_spoken", type: "string" },
      { attribute: "code", field: "code", type: "string" },
    ],
  },
});

const searchClient = Client(sk) as unknown as any;

const ProfileHits = () => {
  const { hits } = useHits();

  if (!hits || hits.length === 0) {
    return <div>No profiles found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {hits.map((hit: any) => (
        <ProfileSearchCard key={hit.id} data={hit} />
      ))}
    </div>
  );
};

const AthleteSearchPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <InstantSearch indexName="athletes_triples" searchClient={searchClient}>
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
              <SidebarProfiles />
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <SearchBox />
            <ProfileHits />
            <Pagination />
          </div>
        </div>
      </InstantSearch>
    </ThemeProvider>
  );
};

export default AthleteSearchPage;
