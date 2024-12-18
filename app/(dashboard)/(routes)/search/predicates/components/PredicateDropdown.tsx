// app/(dashboard)/(routes)/profiles/[type]/[id]/components/PredicateDropdown.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface PredicateDropdownProps {
  currentPredicate: string;
  type: 'athlete' | 'brand';
}

const PredicateDropdown: React.FC<PredicateDropdownProps> = ({ currentPredicate, type }) => {
  const [predicates, setPredicates] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<'athlete' | 'brand'>(type);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch the list of predicates for the selected type
    const fetchPredicates = async () => {
      try {
        const response = await fetch(`/api/predicates/list?type=${currentType}`);
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
  }, [currentType]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle type toggle
  const handleTypeToggle = (selectedType: 'athlete' | 'brand') => {
    setCurrentType(selectedType);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="text-3xl font-bold text-blue-600 cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentPredicate.replace(/_/g, ' ')}
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 z-50 w-64 rounded-2xl shadow-lg bg-gray-800 text-white ring-1 ring-black ring-opacity-5 border border-white/20"
        >
          {/* Type Toggle Tabs */}
          <div className="flex justify-center border-b border-gray-700">
            <button
              onClick={() => handleTypeToggle('athlete')}
              className={`w-1/2 py-2 text-sm font-medium ${
                currentType === 'athlete'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Athletes
            </button>
            <button
              onClick={() => handleTypeToggle('brand')}
              className={`w-1/2 py-2 text-sm font-medium ${
                currentType === 'brand'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Brands
            </button>
          </div>

          <div
            className="p-2 max-h-96 overflow-y-auto"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* Internet Explorer 10+ */
            }}
          >
            {predicates.map((predicate) => (
              <Link
                key={predicate}
                href={`/search/predicates/${currentType}/${encodeURIComponent(predicate)}`}
              >
                <div
                  className={`block w-full text-left px-6 py-3 text-base rounded-lg hover:bg-gray-700 transition-colors cursor-pointer ${
                    predicate === currentPredicate && currentType === type ? 'font-bold' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {predicate.replace(/_/g, ' ')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default PredicateDropdown;
