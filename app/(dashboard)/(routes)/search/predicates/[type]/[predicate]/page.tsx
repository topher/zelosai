'use client';

import React, { useState, useEffect } from 'react';
import TripleCardPredicate from '@/app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardPredicate';
import Loader from '@/app/components/Loader';
import Masonry from 'masonry-layout';
import './PredicatePage.css'; // Import the CSS for masonry
import PredicateSidebar from '@/app/(dashboard)/(routes)/profiles/[type]/[id]/components/PredicateSidebar';

interface Triple {
  subject: string;
  predicate: string;
  object: string;
  citation?: string;
  subjectName?: string;
}

const PredicatePage: React.FC<{ params: { predicate: string; type: string } }> = ({ params }) => {

  const { predicate, type } = params;

  const [triples, setTriples] = useState<Triple[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Function to fetch triples from the API
  const fetchTriples = async (
    predicate: string,
    type: string,  // Added the type parameter
    search: string,
    page: number
  ) => {
    setIsLoading(true);
    try {
      // Include the type in the URL path
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
    fetchTriples(predicate, type, searchQuery, page);  // Pass the type here
  }, [predicate, type, searchQuery, page]);

  // Initialize Masonry after triples are set
  useEffect(() => {
    const grid = document.querySelector('.my-masonry-grid');
    if (grid) {
      new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 30, // Ensure this matches your CSS gutter size
      });
    }
  }, [triples]);

  // Pagination handlers
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-6">
        Triples for Predicate:{' '}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => setShowSidebar(true)}
        >
          {predicate.replace(/_/g, ' ')}
        </span>
      </h1>

      {showSidebar && (
        <PredicateSidebar
          currentPredicate={predicate}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search within results..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
        <Loader />
      ) : triples.length > 0 ? (
        /* Triples Display using Masonry */
        <div className="my-masonry-grid">
          <div className="grid-sizer"></div>
          {triples.map((triple, index) => (
            <div className="grid-item" key={index}>
              <TripleCardPredicate triple={triple} />
            </div>
          ))}
        </div>
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
  );
};

export default PredicatePage;
