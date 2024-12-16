"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { TextInputForm } from "./generationForms/TextInputForm";
import { ImageInputForm } from "./generationForms/ImageInputForm";
import { VoiceInputForm } from "./generationForms/AudioInputForm";

import { TextResponseCard } from "./generationCards/TextResponseCard";
import { ImageResponseCard } from "./generationCards/ImageResponseCard";
import { AudioResponseCard } from "./generationCards/AudioResponseCard";

import { AIModel } from "@/app/types"; // Replace with your actual AIModel type
import { Empty } from "@/components/ui/empty";
import { Loader } from "lucide-react";

const GenerationTab = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [modelType, setModelType] = useState<string | null>(null);
  const [modelId, setModelId] = useState<string | undefined>(undefined);
  const [modelData, setModelData] = useState<AIModel | null>(null);
  const [responses, setResponses] = useState<any[]>([]); // Adjust type based on response

  useEffect(() => {
    const pathSegments = pathname?.split("/") || [];
    const modelsIndex = pathSegments.findIndex((segment) => segment === "models");
    if (modelsIndex !== -1 && pathSegments.length > modelsIndex + 2) {
      setModelType(pathSegments[modelsIndex + 1]);
      setModelId(pathSegments[modelsIndex + 2]);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchModelData = async () => {
      if (modelId) {
        try {
          const response = await axios.get(`/api/models/${modelId}`);
          setModelData(response.data);
        } catch (error) {
          toast.error("Failed to load model data.");
        }
      }
    };

    fetchModelData();
  }, [modelId]);

  const handleTextResponse = (message: string, role: "user" | "assistant") => {
    setResponses((prev) => [...prev, { message, role }]);
  };

  const handleImageResponse = (images: string[]) => {
    setResponses((prev) => [...prev, ...images.map((src) => ({ src }))]);
  };

  const handleAudioResponse = (audioUrl: string) => {
    setResponses((prev) => [...prev, { src: audioUrl }]);
  };

  if (!modelType || !modelId || !modelData) {
    return <Loader />;
  }

  const renderInputForm = () => {
    switch (modelType) {
      case "text":
        return (
          <TextInputForm
            modelId={modelId}
            modelData={modelData}
            onResponse={handleTextResponse}
          />
        );
      case "image":
        return (
          <ImageInputForm
            modelId={modelId}
            modelData={modelData}
            onResponse={handleImageResponse}
          />
        );
      case "voice":
        return (
          <VoiceInputForm
            modelId={modelId}
            modelData={modelData}
            onResponse={handleAudioResponse}
          />
        );
      default:
        return <Empty label="Unsupported model type." />;
    }
  };

  const renderResponseCards = () => {
    if (responses.length === 0) {
      return <Empty label="No responses yet." />;
    }

    return responses.map((res, index) => {
      if (modelType === "text") {
        return (
          <TextResponseCard key={index} message={res.message} role={res.role} />
        );
      } else if (modelType === "image") {
        return <ImageResponseCard key={index} src={res.src} />;
      } else if (modelType === "voice") {
        return <AudioResponseCard key={index} src={res.src} />;
      }
      return null;
    });
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Model Playground</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => router.push('/preset')}
        >
          Load Preset
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="sidebar w-full md:w-1/3 border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-lg flex flex-col gap-6">
          <h2 className="text-lg font-medium mb-4">Image Parameters</h2>
          {renderInputForm()}
        </div>

        {/* Main Panel */}
        <div className="w-full md:w-2/3 space-y-4">
          {renderResponseCards()}
        </div>
      </div>
    </div>
  );
};

export default GenerationTab;
