// components/layouts/LibraryLayout.tsx

import React from "react";
import FeatureHeader from "../molecules/feature-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

interface HeaderProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

interface ItemType {
  id: string;
  [key: string]: any;
}

interface CategoryType<TItem extends ItemType> {
  name: string;
  items: TItem[];
  cardProps?: Record<string, any>;
}

interface TabType<TItem extends ItemType> {
  value: string;
  label: string;
  categories?: CategoryType<TItem>[];
  content?: React.ReactNode;
}

interface LibraryLayoutProps<TItem extends ItemType> {
  header: HeaderProps;
  tabs: TabType<TItem>[];
  isLoading?: boolean;
  error?: string | null;
  cardComponent: React.ComponentType<{ item: TItem } & any>;
  itemLink: (item: TItem) => string;
}

const LibraryLayout = <TItem extends ItemType>({
  header,
  tabs,
  isLoading = false,
  error = null,
  cardComponent: CardComponent,
  itemLink,
}: LibraryLayoutProps<TItem>) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-indigo-900">
      {/* Header Component */}
      <FeatureHeader
        title={header.title}
        description={header.description}
        actions={header.actions}
      />

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          {/* Tabs and Content */}
          <Tabs defaultValue={tabs[0]?.value} className="h-full space-y-6">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.content ? (
                  // If custom content is provided, render it
                  <div>{tab.content}</div>
                ) : (
                  // Otherwise, render categories and items
                  tab.categories?.map((category) => (
                    <div key={category.name} className="mb-8">
                      <h2 className="text-2xl text-white font-semibold tracking-tight mb-4">
                        {category.name}
                      </h2>
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {category.items.map((item) => (
                              <Link key={item.id} href={itemLink(item)}>
                                <CardComponent item={item} {...category.cardProps} />
                              </Link>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LibraryLayout;
