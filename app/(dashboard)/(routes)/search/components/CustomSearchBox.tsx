// /app/(dashboard)/(routes)/search/components/CustomSearchBox.tsx

"use client";

import React from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { Button } from "@/components/ui/button";

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
        className="w-full rounded-lg border border-gray-400 bg-gray-800 text-white py-3 px-5 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        placeholder={placeholder}
      />
      <Button
        type="submit"
        variant="default"
        size="icon"
        className="absolute right-0 top-1/2 h-12 w-12 border border-gray-400 transform -translate-y-1/2 hover:scale-110 hover:-translate-y-1/2 transition-transform"
      >
        {/* Search icon */}
        <svg
          className="h-6 w-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <line x1="16" y1="16" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Button>
    </form>
  );
};

export default CustomSearchBox;
