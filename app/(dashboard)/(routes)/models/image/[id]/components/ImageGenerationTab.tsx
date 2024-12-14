// /app/(dashboard)/(routes)/models/image/[id]/components/ImageGenerationTab.tsx

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

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

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
    <aside className={cn("w-full p-6 bg-gray-800 text-gray-200 relative h-full", montserrat.className)}>
      {isSmallScreen && drawerOpen && (
        <IconButton
          onClick={() => setDrawerOpen(false)}
          aria-label="Close drawer"
          sx={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            color: '#e5e7eb',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <Close />
        </IconButton>
      )}
      <h2 className="text-2xl font-semibold mb-6 text-white">Image Parameters</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
          {parameterDefinitions.txt2image.map((param) => {
            const watchedValue = form.watch(param.name as keyof z.infer<typeof imageFormSchema>);
            return (
              <FormItem key={param.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">{param.label}</label>
                <div className="flex flex-wrap gap-2">
                  {param.options.map((option) => {
                    const isSelected = watchedValue === option.value;
                    return (
                      <Button
                        key={option.value}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-transform transform ${
                          isSelected
                            ? "bg-gradient-to-r from-purple-800 to-pink-500 text-white scale-105"
                            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
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
            );
          })}
          <FormField
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <label className="block text-sm font-medium text-gray-300">Amount</label>
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
            className="w-full bg-gradient-to-r from-purple-800 to-pink-500 text-white hover:scale-105 hover:shadow-lg transition-transform"
          >
            {isLoading ? <Loader className="mr-2" /> : "Generate Image"}
          </Button>
        </form>
      </Form>
    </aside>
  );

  // Dummy images for preview if no images generated yet
  const dummyImages = [
    "https://picsum.photos/300/200?random=1",
    "https://picsum.photos/300/200?random=2",
    "https://picsum.photos/300/200?random=3",
    "https://picsum.photos/300/200?random=4",
    "https://picsum.photos/300/200?random=5",
    "https://picsum.photos/300/200?random=6",
  ];

  const displayImages = images.length > 0 ? images : dummyImages;

  return (
    <div className={cn("flex flex-col md:flex-row flex-1 bg-gray-900", montserrat.className)}>
      {isSmallScreen ? (
        <>
          {/* Conditionally render the Menu IconButton only when the drawer is closed */}
          {!drawerOpen && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                position: 'fixed',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)',
                backgroundColor: '#1f2937',
                color: '#e5e7eb',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                padding: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                width: '50px',
                height: '50px',
                '&:hover': {
                  backgroundColor: '#374151',
                },
                zIndex: 1300,
              }}
            >
              <Menu />
            </IconButton>
          )}

          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              style: { backgroundColor: "#1f2937", width: "75vw" },
            }}
          >
            {renderSidebarContent()}
          </Drawer>
        </>
      ) : (
        <aside className="w-1/4 bg-gray-800">{renderSidebarContent()}</aside>
      )}

      <main className="flex-1 flex flex-col p-2 sm:p-6 bg-gray-900 text-gray-200">
        <h2 className="text-2xl font-bold text-white mb-8 self-center">Generated Images</h2>
        {isLoading && <Loader className="text-gray-200 self-center" />}
        {!isLoading && images.length === 0 && (
          <p className="text-gray-400 mb-4 text-center">Sample images:</p>
        )}
        <div className="max-w-5xl mx-auto w-full mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
            {displayImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Generated image ${idx + 1}`}
                className="rounded-lg shadow-md border border-gray-700 w-full h-auto"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
