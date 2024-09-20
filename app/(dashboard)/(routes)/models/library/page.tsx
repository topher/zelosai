"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIModelCard } from "./components/album-artwork";
import Link from "next/link";
import { getAIModelsByAccountId, getModelCategoriesByAccountId } from "@/app/actions/modelsActions"; // Assuming we fetch models with this action
import { UserDefinedModelCategory, AIModel } from "@/app/types";

const accountId = "12345"; // Fetch based on the current accountId

export default function MusicPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [categories, setCategories] = useState<UserDefinedModelCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend (models and categories by accountId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching models and categories for accountId: ${accountId}`);

        const fetchedModels = await getAIModelsByAccountId(accountId); // Replace with your action method to fetch models
        console.log("Fetched models:", fetchedModels);

        const fetchedCategories = await getModelCategoriesByAccountId(accountId); // Assuming you fetch categories too
        console.log("Fetched categories:", fetchedCategories);

        setModels(fetchedModels);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to filter models based on categories
  const filterModels = (models: AIModel[], category: UserDefinedModelCategory) => {
    console.log(`Filtering models for category: ${category.name}`);

    const filteredModels = models.filter((model: AIModel) => {
      if (!model.tags) {
        console.warn(`Model ${model.modelId} does not have tags. Skipping...`);
        return false;
      }
      const includes = category.includes || [];
      const excludes = category.excludes || [];

      const includesMatch = includes.every((tag) => model.tags.includes(tag));
      const excludesMatch = excludes.every((tag) => !model.tags.includes(tag));

      return includesMatch && excludesMatch;
    });

    console.log(`Filtered models for ${category.name}:`, filteredModels);
    return filteredModels;
  };

  if (loading) {
    return <p>Loading AI models and categories...</p>;
  }

  return (
    <>
      <div className="md:hidden">
        {/* Dynamic images with fallback */}
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="music" className="relative">
                          Recent
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">Archive</TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          All
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>
                          <PlusCircledIcon className="mr-2 h-4 w-4" />
                          New AI Model
                        </Button>
                      </div>
                    </div>
                    <TabsContent value="music" className="border-none p-0 outline-none">
                      {categories.map((category) => (
                        <div key={category.name}>
                          <h2 className="text-2xl font-semibold tracking-tight">
                            {category.name}
                          </h2>
                          <div className="relative">
                            <ScrollArea>
                              <div className="flex space-x-4 pb-4">
                                {filterModels(models, category).map((model) => (
                                  <Link
                                    key={model.modelId}
                                    href={`/models/${model.tags[0]}/${model.modelId}`}
                                  >
                                    <AIModelCard
                                      key={model.modelId} // Use unique key
                                      tool={model}
                                      className="w-[150px]"
                                      aspectRatio="square"
                                      width={150}
                                      height={150}
                                    />
                                  </Link>
                                ))}
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="podcasts" className="h-full flex-col border-none p-0 data-[state=active]:flex">
                      {/* <AnalyticsPage /> */}
                      <Separator className="my-4" />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
