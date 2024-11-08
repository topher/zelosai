// Navbar.tsx
'use client'
import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Dashboard from "../cards/triple-cards/Dashboard"
import { FaSearch } from 'react-icons/fa';  // Importing search icon from 'react-icons'


import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';

import searchClient from '@/app/components/SearchClient';
import { useState } from "react";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const Hit = ({ hit }) => (
    <div className="bg-white p-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors duration-300">
        <a href={`profiles/${hit.objectID}`} target="_blank" rel="noopener noreferrer">
            <h3 className="text-lg font-semibold mb-2">
                <Highlight hit={hit} attribute="name" />
            </h3>
            <p className="text-gray-600">{hit.noc} - {hit.dis}</p>
            <p className="text-gray-500 text-sm mt-2">{hit['Club name']}</p>
        </a>
    </div>
);
  
    // Render the Hits only if the searchQuery is not empty
    const renderHits = () => {
      if (searchQuery) {
        return (
          <div className="absolute top-full left-0 w-full mt-2 max-h-[300px] overflow-y-auto border border-gray-300 rounded-md shadow-lg bg-white">
            <Hits hitComponent={Hit} />
          </div>
        );
      }
      return null;
    };
    
    return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <InstantSearch searchClient={searchClient} indexName="athlete_samples_oct18a">
              <div className="relative w-full mx-auto md:max-w-xl lg:max-w-2xl">
              <SearchBox 
                  // Pass the custom onChange handler to update local state and styling
                  onChange={event => setSearchQuery(event.currentTarget.value)}
                  translations={{ placeholder: 'Search...' }}
                  submit={<FaSearch className="absolute text-gray-500 left-3 top-1/2 transform -translate-y-1/2" />}
                  className="border border-gray-300 rounded-md w-full py-2 px-10 text-lg font-medium placeholder-gray-600 shadow-sm hover:shadow-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                {renderHits()}
              </div>
            </InstantSearch>

            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}

export default Navbar;
