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
              ? "bg-gradient-to-r from-indigo to-pink-500 text-white"
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

export default CustomPagination;
