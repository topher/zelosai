// components/generationTabs/ImageGenerationTab.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Empty } from "@/components/ui/empty";
import { parameterDefinitions, imageFormSchema } from "../../../components/constants";
import { ParameterField } from "../../../components/generationForms/ParameterField";

import { constructImagePrompt } from "@/utils/promptBuilder";

interface ImageGenerationTabProps {
  modelId: string | undefined;
  modelData: any;
}

export const ImageGenerationTab: React.FC<ImageGenerationTabProps> = ({ modelId, modelData }) => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      prompt: "",
      subject_type: "person",
      setting_location: "urban backdrop",
      style_theme: "cinematic",
      resolution: "1920x1080",
      lighting: "natural lighting",
      special_effects: "",
      narrative_tone: "",
      amount: 1,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof imageFormSchema>) => {
    try {
      setImages([]);

      const constructedPrompt = constructImagePrompt(values);

      const apiUrl = modelData?.replicate_id
        ? `/api/image/${modelData.replicate_id}`
        : `/api/image/${modelId}`;

      const payload = {
        prompt: constructedPrompt,
        resolution: values.resolution,
        amount: values.amount,
      };

      const response = await axios.post(apiUrl, payload);

      setImages(response.data.images);
      form.reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-1 bg-white">
      <aside className="w-1/4 bg-gray-50 border-r border-gray-200 p-6 overflow-auto">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Image Parameters</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {parameterDefinitions.txt2image.map((param) => (
              <ParameterField key={param.name} parameter={param} />
            ))}
            <FormField
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                  </div>
                  <FormControl>
                    <select
                      {...field}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {[1, 2, 3].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 text-white hover:bg-purple-700">
              {isLoading ? <Loader className="mr-2" /> : "Generate Image"}
            </Button>
          </form>
        </Form>
      </aside>

      <main className="w-3/4 flex flex-col justify-center items-center p-12 overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Generated Images</h2>
        {isLoading && <Loader />}
        {!images.length && !isLoading && <Empty label="No images generated yet." />}
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((src, idx) => (
              <img key={idx} src={src} alt={`Generated image ${idx + 1}`} className="rounded-lg shadow-md" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
