// app/components/profile/PredicateSidebar.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PredicateSidebarProps {
  currentPredicate: string;
  onClose: () => void;
}

const PredicateSidebar: React.FC<PredicateSidebarProps> = ({ currentPredicate, onClose }) => {
  const [predicates, setPredicates] = useState<string[]>([]);
  const [type, setType] = useState<'athlete' | 'brand'>('athlete');

  useEffect(() => {
    // Fetch the list of predicates for the selected type
    const fetchPredicates = async () => {
      try {
        const response = await fetch(`/api/predicates/list?type=${type}`);
        if (!response.ok) {
          throw new Error('Failed to fetch predicates');
        }
        const data = await response.json();
        setPredicates(data.predicates);
      } catch (error) {
        console.error('Error fetching predicates:', error);
        setPredicates([]);
      }
    };

    fetchPredicates();
  }, [type]);

  const handleTypeToggle = () => {
    setType((prevType) => (prevType === 'athlete' ? 'brand' : 'athlete'));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="bg-white w-64 p-4">
        {/* Close Button */}
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 float-right">
          &times;
        </button>
        {/* Type Toggle */}
        <div className="mb-4">
          <button
            onClick={handleTypeToggle}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {type === 'athlete' ? 'Switch to Brands' : 'Switch to Athletes'}
          </button>
        </div>
        {/* Predicate List */}
        <ul className="max-h-96 overflow-y-auto">
          {predicates.map((predicate) => (
            <li key={predicate} className="py-1">
              <Link href={`/search/profiles/predicates/${type}/${encodeURIComponent(predicate)}`}>
                <div
                  className={`text-gray-700 hover:text-blue-600 ${
                    predicate === currentPredicate ? 'font-bold' : ''
                  }`}
                >
                  {predicate.replace(/_/g, ' ')}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Clickable background to close the sidebar */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
};

export default PredicateSidebar;
