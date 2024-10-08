"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heading } from "@/components/heading";
import { ImageIcon } from "lucide-react";
import { AIModel } from "@/app/types";

import { ImageGenerationTab } from "./components/ImageGenerationTab";
import { DocumentationTab } from "@/app/(dashboard)/(routes)/models/components/DocumentationTab";
const ImageModelPage = () => {
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
        title={modelData ? modelData.label : "Image Generation"}
        description={modelData ? modelData.description : "Turn your prompt into an image."}
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList>
          <TabsTrigger value="generation">Generation</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="generation">
          <ImageGenerationTab modelId={modelId} modelData={modelData} />
        </TabsContent>
        <TabsContent value="documentation">
          <DocumentationTab modelData={modelData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImageModelPage;
