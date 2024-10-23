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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

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

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="text-3xl font-bold mb-6 text-blue-600 cursor-pointer flex items-center"
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
          className="absolute z-50 w-64 rounded-2xl shadow-lg bg-white text-black ring-1 ring-black ring-opacity-5 border border-gray-200"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          <div className="p-2 max-h-96 overflow-y-auto">
            {predicates.map((predicate) => (
              <Link
                key={predicate}
                href={`/search/predicates/${type}/${encodeURIComponent(predicate)}`}
              >
                <div
                  className={`block w-full text-left px-6 py-3 text-base rounded-lg hover:bg-gray-100 transition-colors cursor-pointer ${
                    predicate === currentPredicate ? 'font-bold' : ''
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
    </div>
  );
};

export default PredicateDropdown;
