import React, { useState } from 'react';
import FBXViewer from './FBXViewer';
import Tag from './Tag'; // Make sure to create a Tag component

interface AssetCardProps {
  asset: {
    name: string;
    type: string;
    path: string;
    scale: number[] | undefined;
    tags?: string[];
  };
  index: number;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, index }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg hover:shadow-2xl rounded-xl p-4 m-2 flex flex-col items-center transition-all"
         style={{ width: '300px', height: 'auto', backdropFilter: 'blur(20px)' }}>
      
      <button 
        className="absolute top-4 right-4 text-white text-opacity-70 hover:text-opacity-100" 
        onClick={() => setShowMenu(!showMenu)}>
        ...
      </button>

      {showMenu && (
        <div className="absolute top-12 right-4 bg-white rounded-lg shadow-lg p-2">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Download</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</a>
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold text-white">{asset.name}</h2>
      <p className="text-sm text-gray-300">{asset.type}</p>
      <FBXViewer src={asset.path} scale={asset.scale} />

      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {asset.tags?.map((tag, idx) => (
          <Tag key={idx} label={tag} />
        ))}
      </div>
    </div>
  );
};

export default AssetCard;
