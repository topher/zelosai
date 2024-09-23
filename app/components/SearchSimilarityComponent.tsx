// SearchSimilarityComponent.tsx
import React from "react";

interface SearchSimilarityComponentProps {
  data: number;
}

const SearchSimilarityComponent: React.FC<SearchSimilarityComponentProps> = ({ data }) => (
  <div className="bg-white bg-opacity-80 rounded-full px-2 py-1 text-sm text-darkGray">
    {`Similarity: ${data}%`}
  </div>
);

export default SearchSimilarityComponent;
