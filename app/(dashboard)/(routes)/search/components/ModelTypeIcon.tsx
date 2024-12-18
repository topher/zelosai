// // ModelTypeIcon.tsx
// import React from 'react';

// interface ModelTypeIconProps {
//   data: 'foundational' | 'specialized';
// }

// const ModelTypeIcon: React.FC<ModelTypeIconProps> = ({ data }) => (
//   <div className="bg-white bg-opacity-75 rounded-full px-2 py-1 text-sm">
//     {data === 'foundational' ? '🌐' : '🔧'}
//   </div>
// );

// export default ModelTypeIcon;

// app/components/ModelTypeIcon.tsx

import React from "react";
import { FaMicrophone, FaKeyboard, FaImage, FaCubes } from "react-icons/fa";

interface ModelTypeIconProps {
  data: string;
}

const ModelTypeIcon: React.FC<ModelTypeIconProps> = ({ data }) => {
  let icon;
  let bgColor = "bg-gray-800";

  switch (data) {
    case "foundational":
      icon = <FaCubes />;
      bgColor = "bg-[#6e6e6e]";
      break;
    case "voice":
      icon = <FaMicrophone />;
      bgColor = "bg-[#ff85c5]";
      break;
    case "text":
      icon = <FaKeyboard />;
      bgColor = "bg-[#b366e2]";
      break;
    case "image":
      icon = <FaImage />;
      bgColor = "bg-[#c23b3b]";
      break;
    default:
      icon = <FaCubes />;
      bgColor = "bg-[#6e6e6e]";
      break;
  }

  return (
    <div
      className={`w-8 h-8 ${bgColor} text-white flex items-center justify-center rounded-full`}
    >
      {icon}
    </div>
  );
};

export default ModelTypeIcon;
