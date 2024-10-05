// library/page.tsx

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
import { getAIModelsByAccountId, getModelCategoriesByAccountId } from "@/app/actions/modelsActions";
import { UserDefinedModelCategory, AIModel } from "@/app/types";

const accountId = "12345"; // Replace with dynamic accountId

export default function ModelsPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [categories, setCategories] = useState<UserDefinedModelCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedModels = await getAIModelsByAccountId(accountId);
        const fetchedCategories = await getModelCategoriesByAccountId(accountId);

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
    return models.filter((model: AIModel) => {
      const includes = category.includes || [];
      const excludes = category.excludes || [];

      const includesMatch = includes.every((tag) => model.tags.includes(tag));
      const excludesMatch = excludes.every((tag) => !model.tags.includes(tag));

      return includesMatch && excludesMatch;
    });
  };

  if (loading) {
    return <p>Loading AI models and categories...</p>;
  }

  return (
    <>
      <div className="md:hidden">
        {/* Mobile view images */}
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
              <div className="col-span-5 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">

                  {/* Title and Description */}
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">AI Model Library</h1>
                    <p className="text-lg text-muted-foreground">
                      Explore the collection of AI models, or build your own.
                    </p>
                  </div>

                  {/* Tabs and Content */}
                  <Tabs defaultValue="recent" className="h-full space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <TabsList>
                        <TabsTrigger value="recent">Recent</TabsTrigger>
                        <TabsTrigger value="archive">Archive</TabsTrigger>
                        <TabsTrigger value="all">All</TabsTrigger>
                      </TabsList>
                      <Button>
                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                        New AI Model
                      </Button>
                    </div>
                    <TabsContent value="recent">
                      {categories.map((category) => (
                        <div key={category.name} className="mb-8">
                          <h2 className="text-2xl font-semibold tracking-tight mb-4">
                            {category.name}
                          </h2>
                          <div className="relative">
                            <ScrollArea>
                              <div className="flex space-x-6 p-4">
                                {filterModels(models, category).map((model) => (
                                  <Link
                                    key={model.modelId}
                                    href={`/models/${model.tags[0]}/${model.modelId}`}
                                  >
                                    <AIModelCard
                                      tool={model}
                                      aspectRatio="landscape"
                                      width={300}
                                      height={225}
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
                    <TabsContent value="archive">
                      {/* Archive content goes here */}
                      <Separator className="my-4" />
                    </TabsContent>
                    <TabsContent value="all">
                      {/* All content goes here */}
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
