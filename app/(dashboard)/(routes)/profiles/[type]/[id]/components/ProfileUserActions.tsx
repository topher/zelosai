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
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: buttonRect.bottom + window.scrollY,
        left: window.innerWidth - 280, // Ensure dropdown is aligned to the far right with 280px width
      });
    }
  }, [isOpen]);

  return (
    <div className="absolute right-4">
      <button
        ref={buttonRef}
        className={`flex items-center space-x-2 bg-gold text-darkGray px-4 py-2 rounded-full hover:bg-indigo-light hover:text-white transition-colors duration-200 ${font.className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Collab with Athlete</span>
        <ChevronDown
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <div
          className={`fixed z-50 w-64 rounded-2xl shadow-lg bg-darkGray text-white ring-1 ring-black ring-opacity-5 border border-white/20 ${font.className}`}
          style={{ top: `${dropdownPos.top}px`, left: `${dropdownPos.left}px` }}
        >
          <div className="p-2">
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
        </div>
      )}
    </div>
  );
};

const ProfileUserActions: React.FC<ProfileUserActionsProps> = ({ type }) => {
  return (
    <div className="flex space-x-4 p-4 items-center relative">
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

      {/* Conditionally render the dropdown button for "Collab with Athlete" */}
      {type === 'athlete' && <DropdownButton />}
    </div>
  );
};

export default ProfileUserActions;
