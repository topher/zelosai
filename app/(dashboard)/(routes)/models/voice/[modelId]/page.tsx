"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Heading } from "@/components/heading";
import { FileAudio } from "lucide-react";
import { AIModel } from "@/app/types";

import { VoiceGenerationTab } from "./components/VoiceGenerationTab";
import { DocumentationTab } from "@/app/(dashboard)/(routes)/models/components/DocumentationTab";

const VoicePage = () => {
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
        title={modelData ? modelData.label : "Voice Generation"}
        description={modelData ? modelData.description : "Turn your prompt into a custom voice."}
        icon={FileAudio}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList>
          <TabsTrigger value="generation">Generation</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="generation">
          <VoiceGenerationTab modelId={modelId} modelData={modelData} />
        </TabsContent>
        <TabsContent value="documentation">
          <DocumentationTab modelData={modelData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VoicePage;
