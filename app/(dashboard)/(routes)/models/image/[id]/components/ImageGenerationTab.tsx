// image/components/generationTabs/ImageGenerationTab.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useMediaQuery, Drawer, IconButton } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Empty } from "@/components/ui/empty";
import { parameterDefinitions, imageFormSchema } from "../../../components/constants";
import CustomAmountSlider from "app/(dashboard)/(routes)/models/components/CustomAmountSlider";
import { constructImagePrompt } from "@/utils/promptBuilder";

interface ImageGenerationTabProps {
  modelId: string | undefined;
  modelData: any;
}

export const ImageGenerationTab: React.FC<ImageGenerationTabProps> = ({ modelId, modelData }) => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

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

  const renderSidebarContent = () => (
    <aside className="w-full p-6 bg-offWhite relative">
      {isSmallScreen && drawerOpen && (
        <IconButton onClick={() => setDrawerOpen(false)} className="absolute top-2 right-2">
          <Close />
        </IconButton>
      )}
      <h2 className="text-xl font-semibold mb-6 text-darkGray">Image Parameters</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
          {parameterDefinitions.txt2image.map((param) => (
            <FormItem key={param.name} className="space-y-2">
              <label className="block text-sm font-medium text-darkGray">{param.label}</label>
              <div className="flex flex-wrap gap-2">
                {param.options.map((option) => {
                  const watchedValue = form.watch(param.name as keyof z.infer<typeof imageFormSchema>);
                  const isSelected = watchedValue === option.value;
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        isSelected
                          ? "bg-gradient-to-r from-[#4b0082] to-[#ff69b4] text-white"
                          : "bg-white text-darkGray hover:bg-[#b366e2] hover:text-white"
                      }`}
                      onClick={() =>
                        form.setValue(param.name as keyof z.infer<typeof imageFormSchema>, option.value)
                      }
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
                <label className="block text-sm font-medium text-darkGray">Amount</label>
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
  );

  return (
    <div className={`flex flex-col md:flex-row flex-1 bg-white`}>
      {isSmallScreen ? (
        <>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            className="fixed top-1/4 left-0 transform -translate-y-1/2 bg-white/30 text-darkGray shadow-lg backdrop-blur-md rounded-full p-3 border border-white/20"
            style={{ width: "50px", height: "50px" }}
          >
            <Menu />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              style: { backgroundColor: "#f4f4f4", width: "75vw" },
            }}
          >
            {renderSidebarContent()}
          </Drawer>
        </>
      ) : (
        <aside className="w-1/4 bg-offWhite">
          {renderSidebarContent()}
        </aside>
      )}
      <main className="flex-1 flex flex-col justify-start items-center p-2 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-darkGray mb-4 sm:mb-8">
          Generated Images
        </h2>
        {isLoading && <Loader />}
        {!images.length && !isLoading && <Empty label="No images generated yet." />}
        {images.length > 0 && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Generated image ${idx + 1}`}
                className="rounded-lg shadow-md w-full h-auto max-w-full"
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
