// components/TaxonomySunburstOverview.tsx

"use client";

import React, { useState } from "react";
import SunburstChart from './sunburst-chart';
import TreeDiagramComponent from './tree-diagram';
import { convertToTree } from "@/lib/convert-to-tree";
import { DataCategory } from "@/app/types";

interface TaxonomySunburstOverviewProps {
  data: DataCategory[];
}

export function TaxonomySunburstOverview({ data }: TaxonomySunburstOverviewProps) {
  const [view, setView] = useState<"sunburst" | "tree">("sunburst"); // State to toggle views

  // Convert data to tree structure
  const treeData = convertToTree(data);

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
          Sunburst Chart
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "tree" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setView("tree")}
        >
          Tree Diagram
        </button>
      </div>

      {/* Visualization */}
      <div className="flex-1">
        {treeData ? (
          view === "sunburst" ? (
            <SunburstChart data={treeData} width={0} height={0} nodePadding={0} margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }} link={{
              stroke: "",
              strokeWidth: 0
            }} />
          ) : (
            <TreeDiagramComponent data={treeData} options={commonOptions} />
          )
        ) : (
          <p>No data available for visualization.</p>
        )}
      </div>
    </div>
  );
}
