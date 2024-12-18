"use client";
import React, { useRef, useEffect, useState } from 'react';
import TreeDiagram from './TreeDiagram';

interface TreeDiagramComponentProps {
  data: any;
  options?: any;
}

const TreeDiagramComponent: React.FC<TreeDiagramComponentProps> = ({ data, options }) => {
  const [chart, setChart] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wrap data in root node if necessary
    let wrappedData = data;
    if (Array.isArray(data)) {
      wrappedData = { name: "root", children: data };
    }

    // Create the tree diagram SVG
    const svgElement = TreeDiagram(wrappedData, options);

    // Convert the SVG element to string (outerHTML)
    if (svgElement) {
      setChart(svgElement.outerHTML); // Convert to string for rendering
    }

    // Clean up on unmount
    return () => {
      setChart(null);
    };
  }, [data, options]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
      dangerouslySetInnerHTML={{ __html: chart || '' }} // Render the SVG as HTML
    />
  );
};

export default TreeDiagramComponent;
