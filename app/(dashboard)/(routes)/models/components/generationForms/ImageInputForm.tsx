// components/generationForms/ImageInputForm.tsx
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

import { ImageResponseCard } from "../generationCards/ImageResponseCard";
import { imageFormSchema, parameterDefinitions } from "../constants";
import { ParameterField } from "./ParameterField";

interface ImageInputFormProps {
  modelId: string;
  modelData: any; // Replace with your AIModel type
  onResponse: (images: string[]) => void;
}

export const ImageInputForm: React.FC<ImageInputFormProps> = ({ modelId, modelData, onResponse }) => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  // Dynamically extend the form schema based on parameters
  const dynamicFormSchema = imageFormSchema.extend({
    subject_type: z.string().min(1, "Subject Type is required"),
    setting_location: z.string().min(1, "Setting/Location is required"),
    style_theme: z.string().min(1, "Style/Theme is required"),
    resolution: z.string().min(1, "Resolution is required"),
    lighting: z.string().min(1, "Lighting is required"),
    special_effects: z.string().optional(),
    narrative_tone: z.string().optional(),
  });

  const form = useForm<z.infer<typeof dynamicFormSchema>>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: {
      prompt: "",
      subject_type: parameterDefinitions.txt2image.find(p => p.name === "subject_type")?.default || "person",
      setting_location: parameterDefinitions.txt2image.find(p => p.name === "setting_location")?.default || "urban backdrop",
      style_theme: parameterDefinitions.txt2image.find(p => p.name === "style_theme")?.default || "cinematic",
      resolution: parameterDefinitions.txt2image.find(p => p.name === "resolution")?.default || "high-definition",
      lighting: parameterDefinitions.txt2image.find(p => p.name === "lighting")?.default || "natural lighting",
      special_effects: parameterDefinitions.txt2image.find(p => p.name === "special_effects")?.default || "none",
      narrative_tone: parameterDefinitions.txt2image.find(p => p.name === "narrative_tone")?.default || "neutral",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof dynamicFormSchema>) => {
    try {
      setImages([]);
      const response = await axios.post(`/api/image/${modelId}`, {
        prompt: values.prompt,
        subject_type: values.subject_type,
        setting_location: values.setting_location,
        style_theme: values.style_theme,
        resolution: values.resolution,
        lighting: values.lighting,
        special_effects: values.special_effects,
        narrative_tone: values.narrative_tone,
        modelId,
      });

      // Assuming the response contains an array of image URLs
      setImages(response.data.images);
      onResponse(response.data.images);
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
        {parameterDefinitions.txt2image.map((param) => (
          <ParameterField key={param.name} parameter={param} />
        ))}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader /> : "Generate"}
        </Button>
      </form>
      {isLoading && <Loader />}
      {images.length === 0 && !isLoading && <Empty label="No images generated." />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {images.map((src, index) => (
          <ImageResponseCard key={index} src={src} />
        ))}
      </div>
    </Form>
  );
};
