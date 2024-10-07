// models/voice/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import ModelPageLayout from "app/(dashboard)/(routes)/models/components/ModelPageLayout";
import { FileAudio } from "lucide-react";
import { AIModel } from "@/app/types";

import { VoiceGenerationTab } from "./components/VoiceGenerationTab";
import { DocumentationTab } from "@/app/(dashboard)/(routes)/models/components/DocumentationTab";

const VoiceModelPage = () => {
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

  const tabs = [
    {
      value: "generation",
      label: "Generation",
      content: <VoiceGenerationTab modelId={modelId} modelData={modelData} />,
    },
    {
      value: "documentation",
      label: "Documentation",
      content: <DocumentationTab modelData={modelData} />,
    },
  ];

  return (
    <ModelPageLayout
      modelData={modelData}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabs={tabs}
      icon={FileAudio}
      iconColor="text-emerald-500"
      bgColor="bg-emerald-500/10"
    />
  );
};

export default VoiceModelPage;
