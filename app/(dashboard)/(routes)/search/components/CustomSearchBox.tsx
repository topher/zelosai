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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search refine logic here if needed.
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-6 flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => refine(e.currentTarget.value)}
        className="w-full rounded-full border border-gray-300 bg-white py-2 px-4 pr-14 text-darkGray focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo-light"
        placeholder={placeholder}
      />
      {/* Search Button */}
      <button
        type="submit"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center h-10 w-10 rounded-full"
        style={{
          background: "linear-gradient(to right, #4b0082, #ff69b4)",
        }}
      >
        {/* Simplified magnifying glass */}
        <svg
          className="h-5 w-5 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </form>
  );
};

export default CustomSearchBox;
