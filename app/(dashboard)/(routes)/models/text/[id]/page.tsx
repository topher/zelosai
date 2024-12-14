// /app/(dashboard)/(routes)/models/text/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import ModelPageLayout from "app/(dashboard)/(routes)/models/components/ModelPageLayout";
import { MessageSquare } from "lucide-react";
import { AIModel } from "@/app/types";

import { TextGenerationTab } from "./components/ConversationGenerationTab";
import { DocumentationTab } from "@/app/(dashboard)/(routes)/models/components/DocumentationTab";

const TextModelPage = () => {
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
      content: <TextGenerationTab modelId={modelId} modelData={modelData} />,
    },
    {
      value: "documentation",
      label: "Documentation",
      content: <DocumentationTab modelData={modelData} />,
    },
  ];

  return (
    <div className="feature-layout min-h-screen text-gray-200">
      <ModelPageLayout
        modelData={modelData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/20"
      />
    </div>
  );
};

export default TextModelPage;
