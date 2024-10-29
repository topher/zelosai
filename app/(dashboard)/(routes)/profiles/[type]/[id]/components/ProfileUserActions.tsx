// /app/(dashboard)/(routes)/profiles/[type]/[id]/components/ProfileUserActions.tsx

import React, { useState, useRef, useEffect } from 'react';
import { BiMessageSquareAdd, BiUserCheck, BiStar, BiUserPlus } from 'react-icons/bi';
import { Montserrat } from 'next/font/google';
import { ChevronDown } from 'lucide-react';

const font = Montserrat({ weight: '600', subsets: ['latin'] });

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface ProfileUserActionsProps {
  type: 'athlete' | 'brand';
}

// ActionButton Component
const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => (
  <button
    className={`flex items-center space-x-2 bg-indigo text-white px-4 py-2 rounded-full hover:bg-indigo-light transition-colors duration-200 ${font.className}`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// Dropdown for Action Buttons on Small Screens
const ActionsDropdown: React.FC<{ type: 'athlete' | 'brand' }> = ({ type }) => {
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
    <div className="relative inline-block w-full md:w-auto" ref={dropdownRef}>
      <button
        className={`flex items-center space-x-2 bg-indigo text-white px-4 py-2 rounded-full hover:bg-indigo-light transition-colors duration-200 ${font.className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Actions</span>
        <ChevronDown
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 md:left-auto mt-2 z-50 w-48 rounded-2xl shadow-lg bg-darkGray text-white ring-1 ring-black ring-opacity-5 border border-white/20 ${font.className}`}
        >
          <div className="p-2">
            <button
              className="block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => console.log('Message clicked')}
            >
              <BiMessageSquareAdd className="inline-block mr-2" size={20} />
              Message
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => console.log('Follow clicked')}
            >
              <BiUserCheck className="inline-block mr-2" size={20} />
              Follow
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => console.log('Favorite clicked')}
            >
              <BiStar className="inline-block mr-2" size={20} />
              Favorite
            </button>
            {type === 'athlete' && (
              <button
                className="block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => console.log('Claim Profile clicked')}
              >
                <BiUserPlus className="inline-block mr-2" size={20} />
                Claim Profile
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// DropdownButton Component for "Collab with Athlete"
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
        className={`flex items-center space-x-2 bg-gold text-darkGray px-4 py-2 rounded-full hover:bg-indigo-light hover:text-white transition-colors duration-200 whitespace-nowrap ${font.className}`}
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
              className="flex items-center w-full text-left px-6 py-3 text-base rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => console.log('Option 1 clicked')}
            >
              Option 1
            </button>
            <button
              className="flex items-center w-full text-left px-6 py-3 text-base rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => console.log('Option 2 clicked')}
            >
              Option 2
            </button>
            <button
              className="flex items-center w-full text-left px-6 py-3 text-base rounded-lg hover:bg-white/10 transition-colors"
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


// Main ProfileUserActions Component
const ProfileUserActions: React.FC<ProfileUserActionsProps> = ({ type }) => {
  return (
    <div className="flex flex-row items-center justify-start md:justify-between gap-4 p-4">
      {/* Left Side: Action Buttons (md and up) or Dropdown (small screens) */}
      <div className="flex items-center md:space-x-4 space-x-0 w-full md:w-auto">
        {/* Action Buttons: Visible on medium and larger screens */}
        <div className="hidden md:flex space-x-4">
          <ActionButton
            icon={<BiMessageSquareAdd size={24} />}
            label="Message"
            onClick={() => console.log('Message clicked')}
          />
          <ActionButton
            icon={<BiUserCheck size={24} />}
            label="Follow"
            onClick={() => console.log('Follow clicked')}
          />
          <ActionButton
            icon={<BiStar size={24} />}
            label="Favorite"
            onClick={() => console.log('Favorite clicked')}
          />
          {type === 'athlete' && (
            <ActionButton
              icon={<BiUserPlus size={24} />}
              label="Claim Profile"
              onClick={() => console.log('Claim Profile clicked')}
            />
          )}
        </div>
        {/* Actions Dropdown: Visible on small screens */}
        <div className="md:hidden w-full">
          <ActionsDropdown type={type} />
        </div>
      </div>

      {/* Right Side: Collab Dropdown (Only for athletes) */}
      {type === 'athlete' && <DropdownButton />}
    </div>
  );
};

export default ProfileUserActions;