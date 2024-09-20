"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { AIModel } from "@/app/types";

import { TextGenerationTab } from "./components/ConversationGenerationTab";
import { DocumentationTab } from "@/app/(dashboard)/(routes)/models/components/DocumentationTab";

const ConversationPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const modelId = pathname.split("/").pop();
  const [activeTab, setActiveTab] = useState("generation");
  const [modelData, setModelData] = useState<AIModel | null>(null);

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await axios.get(`/api/models/${modelId}`);
        setModelData(response.data);
      } catch (error) {
        toast.error("Failed to load model data.");
      }
    };

    fetchModelData();
  }, [modelId]);

  return (
    <div>
      <Heading
        title={modelData ? modelData.label : "Conversation"}
        description={modelData ? modelData.description : "Our most advanced conversation model."}
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList>
          <TabsTrigger value="generation">Generation</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="generation">
          <TextGenerationTab modelId={modelId} modelData={modelData} />
        </TabsContent>
        <TabsContent value="documentation">
          <DocumentationTab modelData={modelData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConversationPage;
