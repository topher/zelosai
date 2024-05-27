import React, { useState } from 'react';
import { AiOutlineMore } from 'react-icons/ai'; // Assuming you're using react-icons


interface NestedCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
  }

const NestedCard: React.FC<NestedCardProps> = ({ icon, title, description, bgColor }) => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`flex items-start ${bgColor} rounded-md p-4 mb-2 shadow relative`}>
      {/* Triple-dot menu icon */}
      <div className="text-2xl text-gray-700 mr-4">
        {icon}
      </div>
      <div className="absolute top-2 right-2">
        <button onClick={toggleMenu}>
          <AiOutlineMore />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Like</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dislike</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Comment</a>
            {/* Add more actions as needed */}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-grow">
        <h3 className="font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default NestedCard;