// Tag.tsx
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface TagProps {
  label: string;
  onDelete?: () => void;
}

const Tag: React.FC<TagProps> = ({ label, onDelete }) => {
  return (
    <div className="flex items-center bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm mr-2 mb-2">
      <span>{label}</span>
      {onDelete && (
        <button onClick={onDelete} className="ml-1 focus:outline-none">
          <AiOutlineClose size={12} />
        </button>
      )}
    </div>
  );
};

export default Tag;
