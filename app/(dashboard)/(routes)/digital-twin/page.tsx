import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AIModelCard } from "./components/album-artwork";
import Link from "next/link";
import AnalyticsPage from "./analytics/page";
import { complete_trained_models, user_defined_model_categories } from "@/app/data";
import { UserDefinedModelCategory, AIModel } from "@/app/types"

// export const metadata: Metadata = {
//   title: "Zelos",
//   description: "Unleash Your Potential. Own Your Legacy.",
// };

// Modify your MusicPage component to dynamically render models based on categories
export default function MusicPage() {
  // Define a function to filter models based on categories
  const filterModels = (models: AIModel[], category: UserDefinedModelCategory) => {
    return models.filter((model: AIModel) => {
      const includes = category.includes || [];
      const excludes = category.excludes || [];

      // Check if model tags match the category's includes and excludes
      const includesMatch = includes.every((tag) => model.tags.includes(tag));
      const excludesMatch = excludes.every(
        (tag) => !model.tags.includes(tag)
      );

      return includesMatch && excludesMatch;
    });
  };

  return (
    <>
      <div className="md:hidden">
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
                        <TabsTrigger value="podcasts">
                          Archive
                        </TabsTrigger>
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
                    <TabsContent
                      value="music"
                      className="border-none p-0 outline-none"
                    >
                      {user_defined_model_categories.map((category) => (
                        <div key={category.name}>
                          <h2 className="text-2xl font-semibold tracking-tight">
                            {category.name}
                          </h2>
                          <div className="relative">
                            <ScrollArea>
                              <div className="flex space-x-4 pb-4">
                                {filterModels(
                                  complete_trained_models,
                                  category
                                ).map((model) => (
                                  <Link
                                    key={model.modelId} // Add key prop here
                                    href={`/digital-twin/${model.tags[0]}/${model.modelId}`}
                                  >
                                    <AIModelCard
                                      key={model.label} // Ensure key prop is unique
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
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <AnalyticsPage />
                      <Separator className="my-4" />
                      {/* Placeholder for Podcasts content */}
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
