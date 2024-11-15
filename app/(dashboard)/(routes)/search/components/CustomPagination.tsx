// /app/(dashboard)/(routes)/search/components/CustomPagination.tsx

"use client";

import React, { useEffect } from "react";
import { usePagination } from "react-instantsearch-hooks-web";

interface CustomPaginationProps {
  onPageChange?: () => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ onPageChange }) => {
  const {
    pages,
    currentRefinement,
    refine,
    isFirstPage,
    isLastPage,
  } = usePagination();

  useEffect(() => {
    if (onPageChange) {
      onPageChange();
    }
  }, [currentRefinement]);

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => refine(currentRefinement - 1)}
        disabled={isFirstPage}
        className={`px-4 py-2 rounded-lg border text-sm font-medium ${
          isFirstPage
            ? "cursor-not-allowed border-gray-600 text-gray-600"
            : "border-gray-600 text-white bg-gray-800 hover:bg-gray-700 hover:shadow transition-colors"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => refine(page)}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            currentRefinement === page
              ? "bg-primary text-primary-foreground border-gray-400 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              : "bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {page + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => refine(currentRefinement + 1)}
        disabled={isLastPage}
        className={`px-4 py-2 rounded-lg border text-sm font-medium ${
          isLastPage
            ? "cursor-not-allowed border-gray-600 text-gray-600"
            : "border-gray-600 text-white bg-gray-800 hover:bg-gray-700 hover:shadow transition-colors"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
