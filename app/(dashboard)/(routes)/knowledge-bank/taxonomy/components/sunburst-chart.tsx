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
      setChart(Sunburst({
        width,
        height,
        data,
        nodePadding,
        margin,
        link
      }));
    }, [width, height, data, nodePadding, margin, link]);
  
    return (
      <div>
        {chart && <> {chart} </>} 
      </div>
    );
  }

export default SunburstChart;
