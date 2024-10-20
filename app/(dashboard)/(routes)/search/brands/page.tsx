// app/(dashboard)/(routes)/search/brands/page.tsx

"use client";

import React, { useState, useRef } from "react";
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
import SidebarBrands from "@/app/components/SidebarBrands";
import BrandSearchCard from "@/app/components/BrandSearchCard";
import CustomSearchBox from "@/app/components/CustomSearchBox";
import CustomPagination from "@/app/components/CustomPagination";
import { SearchParameters } from "algoliasearch-helper";

const sk = new Searchkit({
  connection: {
    host: "http://localhost:9200",
  },
  search_settings: {
    search_attributes: [
      "brand_name",
      "logo_url",
      "primary_industry",
      "secondary_industry",
      "mission_vision",
      "regions",
      "languages",
      "key_partners",
      "key_activities",
      "value_propositions",
      "customer_segments",
      "link",
      "parsed_at",
      "country",
      "category",
      "body_text",
      "infobox",
      "company_name"
    ],
    result_attributes: [
      "brand_name",
      "logo_url",
      "primary_industry",
      "secondary_industry",
      "mission_vision",
      "regions",
      "languages",
      "key_partners",
      "key_activities",
      "value_propositions",
      "customer_segments",
      "link",
      "parsed_at",
      "country",
      "category",
      "body_text",
      "infobox",
      "company_name",
      "subject" // Include 'subject' as it's your unique identifier
    ],
    highlight_attributes: ["brand_name", "body_text"],
    facet_attributes: [
      { attribute: "industries", field: "primary_industry", type: "string" },
      { attribute: "regions", field: "regions", type: "string" },
      { attribute: "audience_lifestyle", field: "audience_lifestyle", type: "string" },
      { attribute: "languages", field: "languages", type: "string" }
      // Add more facets as needed
    ],
  },
});

const searchClient = Client(sk) as unknown as any;

interface Hit {
  subject: string; // e.g., "http://zelos.ai/knowledge/maz_203"
  brand_name?: string;
  logo_url?: string | null;
  primary_industry?: string;
  secondary_industry?: string;
  mission_vision?: string;
  regions?: string[];
  languages?: string[];
  [key: string]: any
}

const BrandHits: React.FC = () => {
  const { hits } = useHits<Hit>();

  if (!hits || hits.length === 0) {
    return <div>No brands found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {hits.map((hit) => {
        const uriSegments = hit.subject.split("/");
        const id = uriSegments[uriSegments.length - 1]; // "maz_203"

        return <BrandSearchCard key={id} data={{ ...hit, id }} />;
      })}
    </div>
  );
};

const BrandSearchPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hitsPerPage, setHitsPerPage] = useState(16); // Default value
  const mainContentRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <InstantSearch indexName="brands_triples" searchClient={searchClient}>
        {/* Configure component with explicit type */}
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
                backgroundImage:
                  'linear-gradient(to right, rgba(245, 245, 245, 0.5) 50%, rgba(255, 255, 255, 0)), url("/bg-marble.jpg")',
                backgroundPosition: 'top left',
                backgroundRepeat: 'repeat',
                backgroundAttachment: 'fixed',
                backgroundSize: 'fixed',
                backdropFilter: 'blur(10px)',
                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
              }}
            >
              <SidebarBrands
                hitsPerPage={hitsPerPage}
                onChangeHitsPerPage={(value) => setHitsPerPage(value)}
              />
            </div>
          )}

          {/* Main content */}
          <div ref={mainContentRef} className="flex-1 p-4 overflow-y-auto">
            {/* Page Title and Top Pagination */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-darkGray ml-4">
                Brands
              </h1>
              <div className="hidden sm:block">
                <CustomPagination onPageChange={scrollToTop} />
              </div>
            </div>
            <CustomSearchBox placeholder="Search for brands..." />
            <BrandHits />
            <div className="mt-6">
              <CustomPagination onPageChange={scrollToTop} />
            </div>
          </div>
        </div>
      </InstantSearch>
    </ThemeProvider>
  );
};

export default BrandSearchPage;
