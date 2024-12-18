// components/generationForms/VoiceInputForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Empty } from "@/components/ui/empty";

import { AudioResponseCard } from "../generationCards/AudioResponseCard";
import { voiceFormSchema, parameterDefinitions } from "../constants";
import { ParameterField } from "./ParameterField";

interface VoiceInputFormProps {
  modelId: string;
  modelData: any; // Replace with your AIModel type
  onResponse: (audioUrl: string) => void;
}

export const VoiceInputForm: React.FC<VoiceInputFormProps> = ({ modelId, modelData, onResponse }) => {
  const router = useRouter();
  const [audioUrl, setAudioUrl] = useState<string | undefined>();

  // Dynamically extend the form schema based on parameters
  const dynamicFormSchema = voiceFormSchema.extend({
    voice_id: z.string().min(1, "Voice ID is required"),
    optimize_streaming_latency: z.enum(["0", "1"]).optional(),
    output_format: z.enum(["mp3_22050_32", "mp3_44100_64", "wav_44100_16"]),
    stability: z.number().min(0).max(1).optional(),
    similarity_boost: z.number().min(0).max(1).optional(),
    style: z.number().min(0).max(1).optional(),
  });

  const form = useForm<z.infer<typeof dynamicFormSchema>>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: {
      prompt: "",
      voice_id: (parameterDefinitions.txt2audio.find(p => p.name === "voice_id")?.default as string) || "",
      optimize_streaming_latency: (parameterDefinitions.txt2audio.find(p => p.name === "optimize_streaming_latency")?.default as "0" | "1") || "0",
      output_format: (parameterDefinitions.txt2audio.find(p => p.name === "output_format")?.default as "mp3_22050_32" | "mp3_44100_64" | "wav_44100_16") || "mp3_22050_32",
      stability: Number(parameterDefinitions.txt2audio.find(p => p.name === "stability")?.default) || 0.5,
      similarity_boost: Number(parameterDefinitions.txt2audio.find(p => p.name === "similarity_boost")?.default) || 0.5,
      style: Number(parameterDefinitions.txt2audio.find(p => p.name === "style")?.default) || 0.5,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof dynamicFormSchema>) => {
    try {
      setAudioUrl(undefined);
      const response = await axios.post(`/api/voice/${modelId}`, {
        prompt: values.prompt,
        voice_id: values.voice_id,
        optimize_streaming_latency: values.optimize_streaming_latency,
        output_format: values.output_format,
        voice_settings: {
          stability: values.stability,
          similarity_boost: values.similarity_boost,
          style: values.style,
        },
        modelId,
      }, {
        responseType: "arraybuffer",
      });

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      onResponse(url);
      form.reset();
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Render Parameter Fields */}
        {parameterDefinitions.txt2audio.map((param) => (
          <ParameterField key={param.name} parameter={param} />
        ))}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader /> : "Generate"}
        </Button>
      </form>
      {isLoading && <Loader />}
      {!audioUrl && !isLoading && <Empty label="No audio generated." />}
      {audioUrl && <AudioResponseCard src={audioUrl} />}
    </Form>
  );
};
