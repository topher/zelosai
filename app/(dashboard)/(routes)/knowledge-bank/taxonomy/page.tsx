"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { TaxonomySunburstOverview } from "./components/TaxonomySunburstOverview";
import { getDataCategoriesByAccountId } from "@/app/actions/dataCategoryActions";
import { DataCategory } from "@/app/types";
import { convertToTree } from "@/lib/convert-to-tree";
import TreeDiagramComponent from "./components/tree-diagram";

const accountId = "12345"; // Replace with dynamic value if needed

const DataCategoryPage: React.FC = () => {
  // **Hooks Inside the Component**
  const [dataCategories, setDataCategories] = useState<DataCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto md:space-x-4 max-w-screen-xl p-8 h-screen flex overflow-hidden">
      {/* Left Column: Statistics and D3 Visualizations */}
      <div className="flex-1 flex flex-col space-y-4">
        {/* 3-Card Statistics Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Public Categories Card */}
          <Card className="p-2">
            <CardHeader className="p-2">
              <CardTitle>Public Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-lg font-bold">{publicCount}</p>
            </CardContent>
          </Card>

          {/* Private Categories Card */}
          <Card className="p-2">
            <CardHeader className="p-2">
              <CardTitle>Private Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-lg font-bold">{privateCount}</p>
            </CardContent>
          </Card>

          {/* Total Categories Card */}
          <Card className="p-2">
            <CardHeader className="p-2">
              <CardTitle>Total Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-lg font-bold">{totalCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Visualization Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Hierarchical View</CardTitle>
          </CardHeader>
          <CardContent
            className="flex justify-center items-center"
            style={{ width: '100%', height: '600px' }}
          >
            <TaxonomySunburstOverview data={treeData} />
          </CardContent>
        </Card>
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
