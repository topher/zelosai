"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { TaxonomySunburstOverview } from "./components/TaxonomySunburstOverview";
import { getDataCategoriesByAccountId } from "@/app/actions/dataCategoryActions";
import { DataCategory } from "@/app/types";
import { convertToTree } from "@/lib/convert-to-tree";
import TreeDiagramComponent from "./components/tree-diagram"

const accountId = "12345"; // Replace with dynamic value if needed

const DataCategoryPage: React.FC = () => {
  // **Hooks Inside the Component**
  const [dataCategories, setDataCategories] = useState<DataCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"sunburst" | "tree">("sunburst"); // State to toggle views

  // **Fetch Data**
  useEffect(() => {
    const fetchDataCategories = async () => {
      try {
        const data = await getDataCategoriesByAccountId(accountId);
        setDataCategories(data);
      } catch (err) {
        setError("Failed to load data categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataCategories();
  }, []);

  // **Handle Loading and Error States**
  if (loading) return <p>Loading data categories...</p>;
  if (error) return <p>{error}</p>;

  // **Calculate Statistics**
  const publicCount = dataCategories.filter(category => category.visibility === "public").length;
  const privateCount = dataCategories.filter(category => category.visibility === "private").length;
  const monetizableCount = dataCategories.filter(category => category.isMonetizable).length;
  const totalCount = dataCategories.length;

  // **Convert Data to Tree Structure**
  const treeData = convertToTree(dataCategories);

  // **Common Options for D3 Visualizations**
  const commonOptions = {
    width: 800,
    height: 500,
    // Add other common options if necessary
  };

  return (
    <div className="flex flex-col p-8 space-y-8 md:flex-row md:space-y-0 md:space-x-8">
      {/* Left Column: Statistics and D3 Visualizations */}
      <div className="flex-1 flex flex-col space-y-8">
        {/* 4-Card Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Public Categories Card */}
          <Card>
            <CardHeader>
              <CardTitle>Public Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{publicCount}</p>
            </CardContent>
          </Card>

          {/* Private Categories Card */}
          <Card>
            <CardHeader>
              <CardTitle>Private Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{privateCount}</p>
            </CardContent>
          </Card>

          {/* Monetizable Categories Card */}
          <Card>
            <CardHeader>
              <CardTitle>Monetizable Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{monetizableCount}</p>
            </CardContent>
          </Card>

          {/* Total Categories Card */}
          <Card>
            <CardHeader>
              <CardTitle>Total Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalCount}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Column: Existing Data Categories Card */}
      <div className="w-full md:w-1/2">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Data Categories</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 flex-1 overflow-auto">
            <DataTable data={dataCategories} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataCategoryPage;
