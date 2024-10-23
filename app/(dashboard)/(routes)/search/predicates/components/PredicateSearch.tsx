// app/components/profile/PredicateSearch.tsx

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import TripleCardPredicate from '../../../profiles/[type]/[id]/components/TripleCardPredicate';
import Loader from '../../../../../components/Loader';
import Masonry from 'react-masonry-css'; // Use react-masonry-css for React compatibility
import debounce from 'lodash.debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import PredicateSidebar from './PredicateSidebar' // Corrected import path

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
  subjectName?: string;
}

interface PredicateSearchProps {
  predicate: string;
  type: 'brand' | 'athlete';
}

const PredicateSearch: React.FC<PredicateSearchProps> = ({ predicate, type }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize search and pagination from query params
  const initialSearch = searchParams.get('q') || '';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const hitsPerPage = 30;

  const [triples, setTriples] = useState<Triple[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(initialPage);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Function to fetch triples from the API
  const fetchTriples = async (
    predicate: string,
    type: 'brand' | 'athlete',
    search: string,
    page: number
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/predicates/${type}/${encodeURIComponent(predicate)}?q=${encodeURIComponent(
          search
        )}&page=${page}&hitsPerPage=${hitsPerPage}`
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

  // Debounced fetch to limit API calls during rapid input
  const debouncedFetch = useMemo(
    () =>
      debounce((predicate: string, type: 'brand' | 'athlete', search: string, page: number) => {
        fetchTriples(predicate, type, search, page);
      }, 300),
    []
  );

  // Fetch triples when predicate, type, searchQuery, or page changes
  useEffect(() => {
    debouncedFetch(predicate, type, searchQuery, page);
    return () => {
      debouncedFetch.cancel();
    };
  }, [predicate, type, searchQuery, page, debouncedFetch]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Pagination handlers
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Define responsive breakpoints for Masonry
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <PredicateSidebar type={type} />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6">
          Triples for Predicate:{' '}
          <span className="text-blue-600">{predicate.replace(/_/g, ' ')}</span>
        </h1>

        {/* Search Box */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search triples..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading Indicator */}
        {isLoading ? (
          <Loader />
        ) : triples.length > 0 ? (
          /* Triples Display using react-masonry-css */
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {triples.map((triple, index) => (
              <TripleCardPredicate key={`${triple.subject}-${index}`} triple={triple} />
            ))}
          </Masonry>
        ) : (
          /* No Results Message */
          <div className="text-center text-gray-500">No triples found.</div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${
                page === totalPages
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
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

export default PredicateSearch;
