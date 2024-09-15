"use client"
import React, { useState } from "react";
import { InstantSearch, SearchBox, Pagination, RefinementList } from "react-instantsearch-hooks-web";
import { useHits } from "react-instantsearch-hooks-web";
import { SearchClient } from "instantsearch.js";
import Client from "@searchkit/instantsearch-client";
import ContractSearchCard from "@/app/components/ContractSearchCard"; // Adjust the path as needed
import Searchkit from "searchkit";

const sk = new Searchkit({
  connection: {
    host: 'http://localhost:9200',  // Ensure this is the correct Elasticsearch host
  },
  search_settings: {
    search_attributes: ["title", "status", "effectiveDate"],
    result_attributes: ["title", "status", "effectiveDate", "expirationDate", "emoji", "id"],
    highlight_attributes: ["title"],
    facet_attributes: [
      { attribute: "status", field: "status.keyword", type: "string" },
      { attribute: "expirationDate", field: "expirationDate", type: "date" }
    ],
  },
});

const searchClient = Client(sk) as unknown as SearchClient;

// Component to render the contract search hits
const ContractHits = () => {
  const { hits } = useHits();

  if (!hits || hits.length === 0) {
    return <div>No contracts found.</div>;  // Handle empty search results
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {hits.map((hit: any) => (
        <ContractSearchCard key={hit.id} data={hit} />
      ))}
    </div>
  );
};

const ContractSearchPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <InstantSearch indexName="contracts" searchClient={searchClient}>
      <div className="flex w-full h-full">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="w-64 p-4 bg-gray-100 border-r">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <RefinementList attribute="status" /> {/* Filter by status */}
            <RefinementList attribute="expirationDate" /> {/* Filter by expiration date */}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 p-4">
          <SearchBox />
          <ContractHits />
          <Pagination />
        </div>
      </div>
    </InstantSearch>
  );
};

export default ContractSearchPage;
