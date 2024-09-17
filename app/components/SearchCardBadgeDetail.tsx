// SearchCardBadgeDetail.tsx
import React from 'react';

interface SearchCardBadgeDetailProps {
  data: string[];
}

const SearchCardBadgeDetail: React.FC<SearchCardBadgeDetailProps> = ({ data }) => (
  <div className="flex flex-wrap mt-2">
    {data.map((badge, index) => (
      <span key={index} className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs mr-1 mb-1">
        {badge}
      </span>
    ))}
  </div>
);

export default SearchCardBadgeDetail;
