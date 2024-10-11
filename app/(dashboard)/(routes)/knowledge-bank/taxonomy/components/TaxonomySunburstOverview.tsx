// components/TaxonomySunburstOverview.tsx

"use client";

import React, { useState } from "react";
import SunburstChart from './sunburst-chart';
import TreeDiagramComponent from './tree-diagram';
import { DataCategory } from "@/app/types";

interface TaxonomySunburstOverviewProps {
  data: DataCategory[]; // Assuming data is already in tree format
}

export function TaxonomySunburstOverview({ data }: TaxonomySunburstOverviewProps) {
  const [view, setView] = useState<"sunburst" | "tree">("sunburst"); // State to toggle views

  // Common options for D3 visualizations, set same width/height for both diagrams
  const commonOptions = {
    width: 800, // Increase width and height to match container
    height: 600,
    // Other common options if necessary
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Toggle Buttons */}
      <div className="flex space-x-4 justify-center">
        <button
          className={`px-4 py-2 rounded ${
            view === "sunburst" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setView("sunburst")}
        >
          Ring
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "tree" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setView("tree")}
        >
          Tree
        </button>
      </div>

      {/* Visualization */}
      <div className="flex-1">
        {data ? (
          view === "sunburst" ? (
            <SunburstChart
              width={commonOptions.width} // Same width
              height={commonOptions.height} // Same height
              data={data}
              nodePadding={0.005}
              margin={{
                left: 150,
                right: 150,
                top: 80,
                bottom: 80,
              }}
              link={{ stroke: '#2ca02c', strokeWidth: 2 }}
            />
          ) : (
            <TreeDiagramComponent data={data} options={commonOptions} /> // Pass same dimensions
          )
        ) : (
          <p>No data available for visualization.</p>
        )}
      </div>
    </div>
  );
}
