"use client"
import React, { useState } from "react";
import { InstantSearch, SearchBox, Pagination, RefinementList } from "react-instantsearch-hooks-web";
import { useHits } from "react-instantsearch-hooks-web";
import { SearchClient } from "instantsearch.js";
import Client from "@searchkit/instantsearch-client";
import ProfileSearchCard from "@/app/components/ProfileSearchCard"; // Adjust the path as needed
import Searchkit from "searchkit";

const sk = new Searchkit({
  connection: {
    host: 'http://localhost:9200', // Ensure this is the correct Elasticsearch host
  },
  search_settings: {
    search_attributes: ["name", "sport", "location"],
    result_attributes: ["name", "sport", "location", "imageSrc", "id"],
    highlight_attributes: ["name"],
    facet_attributes: [
      { attribute: "sport", field: "sport.keyword", type: "string" },
      { attribute: "location", field: "location.keyword", type: "string" }
    ],
  },
});

const searchClient = Client(sk) as unknown as SearchClient;

// Component to render the profile search hits
const ProfileHits = () => {
  const { hits } = useHits();

  if (!hits || hits.length === 0) {
    return <div>No profiles found.</div>;  // Handle empty search results
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {hits.map((hit: any) => (
        <ProfileSearchCard key={hit.id} data={hit} />
      ))}
    </div>
  );
};

const ProfileSearchPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <InstantSearch indexName="athletes" searchClient={searchClient}>
      <div className="flex w-full h-full">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64 p-4 bg-gray-100 border-r">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <RefinementList attribute="sport" /> {/* Filter by sport */}
            <RefinementList attribute="location" /> {/* Filter by location */}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 p-4">
          <SearchBox />
          <ProfileHits />
          <Pagination />
        </div>
      </div>
    </InstantSearch>
  );
};

export default ProfileSearchPage;
