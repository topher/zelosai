"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./components/data-table";
import { getDataCategoriesByAccountId } from "@/app/actions/dataCategoryActions";
import { DataCategory } from "@/app/types";
import { columns } from "./components/columns";

const accountId = "12345"; // Replace with dynamic value

export default function DataCategoryPage() {
  const [dataCategories, setDataCategories] = useState<DataCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading data categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Data Categories</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <DataTable data={dataCategories} columns={columns} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
