// app/components/CustomSearchBox.tsx

"use client";

import React from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";

interface CustomSearchBoxProps {
    placeholder?: string;
  }
  
const CustomSearchBox: React.FC<CustomSearchBoxProps> = ({
    placeholder = "Search...",
  }) => {
    const { query, refine } = useSearchBox();

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => refine(e.currentTarget.value)}
        className="w-full rounded-full border border-gray-300 bg-white py-2 px-4 text-darkGray focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo-light"
        placeholder={placeholder}
      />
      <svg
        className="absolute right-3 top-2 h-6 w-6 text-gray-400"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {/* SVG path for a search icon */}
        <path d="M21.71 20.29l-3.388-3.388A9 9 0 1 0 18 18l3.29 3.29a1 1 0 0 0 1.42-1.42zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
      </svg>
    </div>
  );
};

export default CustomSearchBox;
