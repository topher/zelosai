import React, { useRef, useEffect } from 'react';
import TreeDiagram from './TreeDiagram';

interface TreeDiagramComponentProps {
  data: any;
  options?: any;
}

const TreeDiagramComponent: React.FC<TreeDiagramComponentProps> = ({ data, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear any existing content
      containerRef.current.innerHTML = '';

      // Create the new diagram
      const svg = TreeDiagram(data, options);
      containerRef.current.appendChild(svg);
    }
  }, [data, options]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default TreeDiagramComponent;
