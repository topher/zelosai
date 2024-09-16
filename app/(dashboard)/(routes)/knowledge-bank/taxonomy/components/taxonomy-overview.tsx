"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import SunburstChart from './sunburst-chart';
import { convertToTree } from "@/lib/convert-to-tree";
import { getDataCategoriesByAccountId } from "@/app/actions/dataCategoryActions";
import { DataCategory } from "@/app/types";

const accountId = "12345"; // Replace with dynamic value if needed

export function TaxonomySunburstOverview() {
  const [treeData, setTreeData] = useState<any>(null); // State for transformed tree data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchDataCategories = async () => {
      try {
        const dataCategories: DataCategory[] = await getDataCategoriesByAccountId(accountId);
        const treeData = convertToTree(dataCategories); // Convert fetched data to tree structure
        setTreeData(treeData);
      } catch (err) {
        setError("Failed to load data categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataCategories();
  }, []);

  if (loading) return <p>Loading data categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ResponsiveContainer width="100%" height={500}>
      {treeData && (
        <SunburstChart
          width={1200} // Increased width
          height={600} // Increased height
          data={treeData} // Use the dynamic data
          nodePadding={30}
          margin={{
            left: 150,
            right: 150,
            top: 80,
            bottom: 80,
          }}
          link={{ stroke: '#2ca02c', strokeWidth: 2 }} // Thicker and darker links
        />
      )}
    </ResponsiveContainer>
  );
}
