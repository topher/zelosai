// app/components/profile/ProfileUserActions.jsx

import React, { useState, useRef, useEffect } from 'react';
import { BiMessageSquareAdd, BiUserCheck, BiStar, BiUserPlus } from 'react-icons/bi';
import { Montserrat } from 'next/font/google';
import { ChevronDown } from 'lucide-react'; // Import from Lucide

const font = Montserrat({ weight: '600', subsets: ['latin'] });

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface ProfileUserActionsProps {
  type: 'athlete' | 'brand';
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => (
  <button
    className={`flex items-center space-x-2 bg-indigo text-white px-4 py-2 rounded-full hover:bg-indigo-light transition-colors duration-200 ${font.className}`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const DropdownButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className={`flex items-center space-x-2 bg-gold text-darkGray px-4 py-2 rounded-full hover:bg-indigo-light hover:text-white transition-colors duration-200 ${font.className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Collab with Athlete</span>
        <ChevronDown
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 z-50 w-72 rounded-2xl shadow-lg bg-darkGray text-white ring-1 ring-black ring-opacity-5 border border-white/20 ${font.className}`}
        >
          <div
            className="p-2 max-h-96 overflow-y-auto"
            style={{
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none', /* Internet Explorer 10+ */
            }}
          >
            <button
              className="block w-full text-left px-6 py-3 text-base rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => console.log('Option 1 clicked')}
            >
              Option 1
            </button>
            <button
              className="block w-full text-left px-6 py-3 text-base rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => console.log('Option 2 clicked')}
            >
              Option 2
            </button>
            <button
              className="block w-full text-left px-6 py-3 text-base rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => console.log('Option 3 clicked')}
            >
              Option 3
            </button>
          </div>
          <style jsx>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

const ProfileUserActions: React.FC<ProfileUserActionsProps> = ({ type }) => {
  return (
    <div className="flex items-center p-4 relative">
      {/* Left side buttons */}
      <div className="flex space-x-4 items-center">
        <ActionButton
          icon={<BiMessageSquareAdd size={24} />}
          label="Message"
          onClick={() => {}}
        />
        <ActionButton
          icon={<BiUserCheck size={24} />}
          label="Follow"
          onClick={() => {}}
        />
        <ActionButton
          icon={<BiStar size={24} />}
          label="Favorite"
          onClick={() => {}}
        />
        {/* Conditionally render "Claim Profile" button for athlete profiles only */}
        {type === 'athlete' && (
          <ActionButton
            icon={<BiUserPlus size={24} />}
            label="Claim Profile"
            onClick={() => {}}
          />
        )}
      </div>
      {/* Right side button */}
      {type === 'athlete' && (
        <div className="ml-auto mr-4">
          <DropdownButton />
        </div>
      )}
    </div>
  );
};

export default ProfileUserActions;
