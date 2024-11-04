// app/(dashboard)/(routes)/search/predicates/[type]/[predicate]/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Loader from '@/app/components/Loader';
import PredicateGrid from '@/app/(dashboard)/(routes)/search/predicates/components/PredicateGrid';
import PredicateDropdown from '@/app/(dashboard)/(routes)/search/predicates/components/PredicateDropdown';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ weight: '600', subsets: ['latin'] });

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
  subjectName?: string;
  type: 'athlete' | 'brand';
}

const PredicatePage: React.FC<{ params: { predicate: string; type: 'athlete' | 'brand' } }> = ({ params }) => {
  const { predicate, type } = params;

  const [triples, setTriples] = useState<Triple[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Function to fetch triples from the API
  const fetchTriples = async (
    predicate: string,
    type: string,
    search: string,
    page: number
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/predicates/${type}/${encodeURIComponent(predicate)}?q=${encodeURIComponent(
          search
        )}&page=${page}&hitsPerPage=30`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch triples');
      }
      const data = await response.json();
      setTriples(data.triples);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      console.error('Error fetching triples:', error);
      setTriples([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch triples when predicate, searchQuery, or page changes
  useEffect(() => {
    fetchTriples(predicate, type, searchQuery, page);
  }, [predicate, type, searchQuery, page]);

  // Pagination handlers
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Capitalize the first letter of the predicate for display
  const displayPredicate = predicate.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-900 text-white flex flex-col">
      {/* Header Section */}
      <div className="p-8">
        <h1 className={`text-4xl font-bold flex items-center space-x-2 ${font.className}`}>
          <span>Triples for Predicate:</span>
          <PredicateDropdown currentPredicate={predicate} type={type} />
        </h1>
        {/* <p className="text-lg text-gray-300">
          Explore all {type === 'athlete' ? 'athletes' : 'brands'} associated with "{displayPredicate}"
        </p> */}
      </div>

      {/* Search and Content Section */}
      <div className="px-8 flex-grow">
        {/* Search Box */}
        <div className="relative mb-6 flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-full border border-gray-600 bg-gray-800 py-2 px-4 pr-14 text-white placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search within results..."
          />
          {/* Search Button */}
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
          >
            {/* Simplified magnifying glass */}
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
              <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoading ? (
          <Loader />
        ) : triples.length > 0 ? (
          /* Triples Display using Masonry */
          <PredicateGrid triples={triples} gridClassName="my-masonry-grid" />
        ) : (
          /* No Results Message */
          <div className="text-center text-gray-500">No results found.</div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-full ${
                page === 1
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-full ${
                page === totalPages
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredicatePage;
