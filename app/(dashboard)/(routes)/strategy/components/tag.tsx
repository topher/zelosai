import React from "react";

interface TagProps {
  label: string;
  onDelete: () => void;
}

const Tag: React.FC<TagProps> = ({ label, onDelete }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2 shadow-sm">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        onClick={onDelete}
        className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default Tag;
