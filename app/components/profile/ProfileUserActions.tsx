// ProfileUserActions.jsx
import React from 'react';
import { BiMessageSquareAdd, BiUserCheck, BiStar } from 'react-icons/bi';

const ActionButton = ({ icon, label, onClick }) => (
  <button
    className="action-button flex items-center space-x-2 bg-transparent text-white p-4 border border-white rounded"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const ProfileUserActions = () => {
  return (
    <div className="profile-user-actions flex space-x-4 overflow-x-auto p-4">
      <ActionButton icon={<BiMessageSquareAdd />} label="Message" onClick={() => {}} />
      <ActionButton icon={<BiUserCheck />} label="Follow" onClick={() => {}} />
      <ActionButton icon={<BiStar />} label="Favorite" onClick={() => {}} />
      {/* Add more buttons as needed */}
    </div>
  );
};

export default ProfileUserActions;
