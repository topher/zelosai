// app/(dashboard)/(routes)/models/library/page.tsx

"use client";

import { useEffect, useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { AIModelCard } from "./components/AIModelCard";
import LibraryLayout from "@/app/components/atomic/templates/LibraryLayout";
import { UserDefinedModelCategory, AIModel } from "@/app/types";

export default function ModelsPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [categories, setCategories] = useState<UserDefinedModelCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const modelsResponse = await fetch("/api/resource/complete_trained_models");
        const categoriesResponse = await fetch("/api/resource/user_defined_model_categories");

        if (modelsResponse.ok && categoriesResponse.ok) {
          const modelsData = await modelsResponse.json();
          const categoriesData = await categoriesResponse.json();

          setModels(modelsData.resources);
          setCategories(categoriesData.resources);
        } else {
          setError("Error fetching AI models or categories");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to filter models based on categories
  const filterModels = (models: AIModel[], category: UserDefinedModelCategory) => {
    return models.filter((model: AIModel) => {
      const includes = category.includes || [];
      const excludes = category.excludes || [];

      const includesMatch = includes.every((tag) => model.tags.includes(tag));
      const excludesMatch = excludes.every((tag) => !model.tags.includes(tag));

      return includesMatch && excludesMatch;
    });
  };

  const header = {
    title: "AI Model Library",
    description: "Explore the collection of AI models, or build your own.",
    actions: (
      <Button>
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        New AI Model
      </Button>
    ),
  };

  // Prepare tabs data
  const tabs = [
    {
      value: "recent",
      label: "Recent",
      categories: categories.map((category) => ({
        name: category.name,
        items: filterModels(models, category),
      })),
    },
    {
      value: "archive",
      label: "Archive",
      categories: [], // Provide archive categories if any
    },
    {
      value: "all",
      label: "All",
      categories: [
        {
          name: "All Models",
          items: models,
        },
      ],
    },
  ];

  const itemLink = (model: AIModel) => `/models/${model.tags[0]}/${model.modelId}`;

  return (
    <LibraryLayout<AIModel>
      header={header}
      tabs={tabs}
      isLoading={loading}
      error={error}
      cardComponent={({ item }) => (
        <AIModelCard
          tool={item}
          aspectRatio="landscape"
          width={300}
          height={225}
        />
      )}
      itemLink={itemLink}
    />
  );
}
