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

  // Remove the second conversion
  // const treeData = convertToTree(data); // Remove this line

  // Common options for D3 visualizations
  const commonOptions = {
    width: 800,
    height: 500,
    // Add other common options if necessary
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
              width={1200} // Increased width
              height={600} // Increased height
              data={data} // Use the data directly
              nodePadding={0.005} // Adjusted padding
              margin={{
                left: 150,
                right: 150,
                top: 80,
                bottom: 80,
              }}
              link={{ stroke: '#2ca02c', strokeWidth: 2 }} // Thicker and darker links
            />
          ) : (
            <TreeDiagramComponent data={data} options={commonOptions} />
          )
        ) : (
          <p>No data available for visualization.</p>
        )}
      </div>
    </div>
  );
}
