"use client"
import React from "react";
import { InstantSearch, SearchBox, Pagination } from "react-instantsearch-hooks-web";
import { useHits } from "react-instantsearch-hooks-web";
import { SearchClient } from "instantsearch.js";
import Client from "@searchkit/instantsearch-client";
import AIModelSearchCard from "@/app/components/AIModelSearchCard"; // Adjust the path as needed
import Searchkit from "searchkit";

const sk = new Searchkit({
  connection: {
    host: 'http://localhost:9200', // Ensure this is your correct Elasticsearch host
  },
  search_settings: {
    search_attributes: ["label", "description", "default_language"],
    result_attributes: ["label", "description", "thumbnail", "default_language", "id"],
    highlight_attributes: ["label"],
    facet_attributes: [],
  },
});

// Cast the client to SearchClient to satisfy TypeScript
const searchClient = Client(sk) as unknown as SearchClient;

// Component that renders the AI models using the useHits hook inside InstantSearch
const AIModelHits = () => {
  const { hits } = useHits();
  console.log(hits, "✅")

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {hits.map((hit: any) => (
        <AIModelSearchCard key={hit.id} data={hit} />
      ))}
    </div>
  );
};

const AIModelSearchPage = () => {
  return (
    <InstantSearch indexName="complete_trained_models" searchClient={searchClient}>
      <div className="w-full h-full">
        <SearchBox />
        <AIModelHits /> {/* This renders the AIModel cards */}
        <Pagination />
      </div>
    </InstantSearch>
  );
};

export default AIModelSearchPage;
