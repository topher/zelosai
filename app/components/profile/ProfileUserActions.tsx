// app/components/profile/ProfileUserActions.jsx

import React from 'react';
import { BiMessageSquareAdd, BiUserCheck, BiStar, BiUserPlus } from 'react-icons/bi';
import { Montserrat } from 'next/font/google';

const font = Montserrat({ weight: '600', subsets: ['latin'] })

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface ProfileUserActionsProps {
  type: 'athlete' | 'brand';  // Adjust this type as per your project
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

const ProfileUserActions: React.FC<ProfileUserActionsProps> = ({ type }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto p-4">
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
  );
};

export default ProfileUserActions;
