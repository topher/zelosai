// ModelTypeIcon.tsx
import React from 'react';

interface ModelTypeIconProps {
  data: 'foundational' | 'specialized';
}

const ModelTypeIcon: React.FC<ModelTypeIconProps> = ({ data }) => (
  <div className="bg-white bg-opacity-75 rounded-full px-2 py-1 text-sm">
    {data === 'foundational' ? '🌐' : '🔧'}
  </div>
);

export default ModelTypeIcon;
