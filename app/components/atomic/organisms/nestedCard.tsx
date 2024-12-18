import React, { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";

interface NestedCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onUpdate: () => void;  // Function to handle update
  onDelete: () => void;  // Function to handle delete
  bgColor?: string; // Optional background color
}

const NestedCard: React.FC<NestedCardProps> = ({
  icon,
  title,
  description,
  onUpdate,  // Passed in the update handler
  onDelete,  // Passed in the delete handler
  bgColor = "bg-white", // Default background color
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`flex items-start ${bgColor} border border-gray-200 rounded-md p-4 mb-2 shadow-sm relative`}>
      {/* Icon */}
      <div className="text-2xl text-[#111827] mr-4">{icon}</div>

      {/* Triple-dot menu icon */}
      <div className="absolute top-2 right-2">
        <button onClick={toggleMenu}>
          <AiOutlineMore className="text-[#111827]" />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            {/* Update Option */}
            <button
              onClick={onUpdate}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Update
            </button>
            {/* Delete Option */}
            <button
              onClick={onDelete}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Delete
            </button>
            {/* Like Option */}
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Like
            </button>
            {/* Dislike Option */}
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Dislike
            </button>
            {/* Comment Option */}
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Comment
            </button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-grow">
        <h3 className="font-semibold text-[#111827]">{title || 'Untitled'}</h3>
        <p className="text-[#111827]">{description || 'No description available'}</p>
      </div>
    </div>
  );
};

export default NestedCard;
