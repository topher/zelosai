// models/components/ModelPageLayout.tsx

"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heading } from "@/components/heading";
import { AIModel } from "@/app/types";
import { LucideProps } from "lucide-react";
import React from "react";

interface ModelPageLayoutProps {
  modelData: AIModel | null;
  activeTab: string;
  setActiveTab: (value: string) => void;
  tabs: Array<{ value: string; label: string; content: React.ReactNode }>;
  icon: React.FunctionComponent<LucideProps>;
  iconColor: string;
  bgColor: string;
}

const ModelPageLayout: React.FC<ModelPageLayoutProps> = ({
  modelData,
  activeTab,
  setActiveTab,
  tabs,
  icon,
  iconColor,
  bgColor,
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Heading
        title={modelData ? modelData.label : "Model"}
        description={modelData ? modelData.description : "Model description."}
        icon={icon}
        iconColor={iconColor}
        bgColor={bgColor}
      />
      <div className="flex flex-col flex-1 w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
          <TabsList className="flex justify-center mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="flex-1 flex max-w-4xl">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ModelPageLayout;
