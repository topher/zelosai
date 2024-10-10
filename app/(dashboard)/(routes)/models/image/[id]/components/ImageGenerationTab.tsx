// image/components/generationTabs/ImageGenerationTab.tsx

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
import { constructImagePrompt } from "@/utils/promptBuilder";
import CustomAmountSlider from "app/(dashboard)/(routes)/models/components/CustomAmountSlider";

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
      <aside className="w-full bg-offWhite p-6">
        <h2 className="text-xl font-semibold mb-6 text-darkGray">Image Parameters</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
            {parameterDefinitions.txt2image.map((param) => (
              <FormItem key={param.name} className="space-y-2">
                <label className="block text-sm font-medium text-darkGray">{param.label}</label>
                <div className="flex flex-wrap gap-2">
                  {param.options.map((option) => {
                    const watchedValue = form.watch(param.name as keyof z.infer<typeof imageFormSchema>); // Watch the current value of the specific field
                    const isSelected = watchedValue === option.value; // Check if the current watched value matches the option value

                    return (
                      <Button
                        key={option.value}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-md 
                          ${isSelected ? 'bg-gradient-to-r from-[#4b0082] to-[#ff69b4] text-white' : 'bg-white text-darkGray hover:bg-[#b366e2] hover:text-white'}
                        `}
                        onClick={() => form.setValue(param.name as keyof z.infer<typeof imageFormSchema>, option.value)}
                      >
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </FormItem>
            ))}
            <FormField
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-darkGray">Amount</label>
                  </div>
                  <FormControl>
                    <CustomAmountSlider
                      value={field.value}
                      onChangeValue={(value) => form.setValue("amount", value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#4b0082] to-[#ff69b4] text-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              {isLoading ? <Loader className="mr-2" /> : "Generate Image"}
            </Button>
          </form>
        </Form>
      </aside>

      <main className="w-full flex flex-col justify-center items-center p-12 overflow-auto">
        <h2 className="text-2xl font-bold text-darkGray mb-8">Generated Images</h2>
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
