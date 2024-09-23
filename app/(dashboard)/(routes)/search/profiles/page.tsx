// page.tsx
"use client";

import React, { useState } from "react";
import {
  InstantSearch,
  useSearchBox,
  usePagination,
  useHits,
} from "react-instantsearch-hooks-web";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/theme"; // If using a custom theme
import SidebarToggle from "@/app/components/SidebarToggle"; // For toggling the sidebar
import SidebarProfiles from "@/app/components/SidebarProfiles";
import ProfileSearchCard from "@/app/components/ProfileSearchCard";

// Ensure that you have installed @mui/material, @mui/icons-material, and react-icons
// npm install @mui/material @mui/icons-material react-icons

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

const ProfileHits = () => {
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

const CustomSearchBox = () => {
  const { query, refine } = useSearchBox();

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => refine(e.currentTarget.value)}
        className="w-full rounded-full border border-gray-300 bg-white py-2 px-4 text-darkGray focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo-light"
        placeholder="Search for profiles..."
      />
      <svg
        className="absolute right-3 top-2 h-6 w-6 text-gray-400"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {/* SVG path for a search icon */}
        <path d="M21.71 20.29l-3.388-3.388A9 9 0 1 0 18 18l3.29 3.29a1 1 0 0 0 1.42-1.42zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
      </svg>
    </div>
  );
};

const CustomPagination = () => {
  const { pages, currentRefinement, refine, isFirstPage, isLastPage } =
    usePagination();

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => refine(currentRefinement - 1)}
        disabled={isFirstPage}
        className={`px-3 py-1 rounded-full ${
          isFirstPage
            ? "cursor-not-allowed text-gray-400"
            : "text-indigo hover:text-indigo-light"
        }`}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => refine(page)}
          className={`px-3 py-1 rounded-full ${
            currentRefinement === page
              ? "bg-indigo text-white"
              : "text-darkGray hover:bg-indigo-light hover:text-white"
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={() => refine(currentRefinement + 1)}
        disabled={isLastPage}
        className={`px-3 py-1 rounded-full ${
          isLastPage
            ? "cursor-not-allowed text-gray-400"
            : "text-indigo hover:text-indigo-light"
        }`}
      >
        Next
      </button>
    </div>
  );
};

const ProfileSearchPage = () => {
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
            <CustomSearchBox />
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
