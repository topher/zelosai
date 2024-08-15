import React, { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";

interface NestedCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor?: string; // Making bgColor optional
}

const NestedCard: React.FC<NestedCardProps> = ({
  icon,
  title,
  description,
  bgColor = "bg-white", // Default to white background
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div
      className={`flex items-start ${bgColor} border border-gray-200 rounded-md p-4 mb-2 shadow-sm relative`}
    >
      {/* Icon */}
      <div className="text-2xl text-[#111827] mr-4">{icon}</div>

      {/* Triple-dot menu icon */}
      <div className="absolute top-2 right-2">
        <button onClick={toggleMenu}>
          <AiOutlineMore className="text-[#111827]" />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Like
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dislike
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Comment
            </a>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex-grow">
        <h3 className="font-semibold text-[#111827]">{title}</h3>
        <p className="text-[#111827]">{description}</p>
      </div>
    </div>
  );
};

export default NestedCard;
