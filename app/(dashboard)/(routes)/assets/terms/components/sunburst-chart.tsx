"use client"
import React, { useState, useEffect } from 'react';
import { Sunburst } from './SunburstChart.js';

interface SunburstProps {
  width: number;
  height: number;
  data: any[];
  nodePadding: number;
  margin: { left: number; right: number; top: number; bottom: number; };
  link: { stroke: string; strokeWidth: number; };
}

function SunburstChart({ width, height, data, nodePadding, margin, link }: SunburstProps) {
    const [chart, setChart] = useState(null);

    useEffect(() => {
      const svgElement = Sunburst({
        width,
        height,
        data,
        nodePadding,
        margin,
        link
      });
    
      setChart(svgElement.outerHTML); // Convert to string for rendering
    
    }, [width, height, data, nodePadding, margin, link]);
    
    return (
      <div dangerouslySetInnerHTML={{ __html: chart }} />
    );
  }

export default SunburstChart;
