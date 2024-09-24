// app/profiles/page.tsx

"use client";

import React, { useState } from "react";
import { InstantSearch, useHits } from "react-instantsearch-hooks-web";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme";
import SidebarToggle from "@/app/components/SidebarToggle";
import SidebarProfiles from "@/app/components/SidebarProfiles";
import ProfileSearchCard from "@/app/components/ProfileSearchCard";
import CustomSearchBox from "@/app/components/CustomSearchBox";
import CustomPagination from "@/app/components/CustomPagination";

const sk = new Searchkit({
  connection: {
    host: "http://localhost:9200",
  },
  search_settings: {
    search_attributes: ["name", "sport", "location"],
    result_attributes: [
      "name",
      "sport",
      "location",
      "imageSrc",
      "id",
      "accolades",
      "similarity_score",
    ],
    highlight_attributes: ["name"],
    facet_attributes: [
      { attribute: "sport", field: "sport", type: "string" },
      { attribute: "location", field: "location", type: "string" },
    ],
  },
});

const searchClient = Client(sk);

const ProfileHits: React.FC = () => {
  const { hits } = useHits();

  if (!hits || hits.length === 0) {
    return <div>No profiles found.</div>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {hits.map((hit: any) => (
        <ProfileSearchCard key={hit.id} data={hit} />
      ))}
    </div>
  );
};

const ProfileSearchPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <InstantSearch indexName="athletes" searchClient={searchClient}>
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
            <div className="w-64 p-4 bg-white border-r shadow-lg overflow-y-auto hidden lg:block">
              <SidebarProfiles />
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-darkGray mb-6">
              Athlete Profiles
            </h1>
            <CustomSearchBox placeholder="Search for profiles..." />
            <ProfileHits />
            <div className="mt-6">
              <CustomPagination />
            </div>
          </div>
        </div>
      </InstantSearch>
    </ThemeProvider>
  );
};

export default ProfileSearchPage;
