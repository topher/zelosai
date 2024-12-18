// /app/(dashboard)/(routes)/models/voice/[modelId]/components/VoiceGenerationTab.tsx

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
import { parameterDefinitions, voiceFormSchema } from "../../../components/constants";
import CustomAmountSlider from "app/(dashboard)/(routes)/models/components/CustomAmountSlider";
import { Switch } from "@headlessui/react";

import { constructVoicePrompt } from "@/utils/promptBuilder";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

interface VoiceGenerationTabProps {
  modelId: string | undefined;
  modelData: any;
}

export const VoiceGenerationTab: React.FC<VoiceGenerationTabProps> = ({ modelId, modelData }) => {
  const router = useRouter();
  const [voices, setVoices] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const form = useForm<z.infer<typeof voiceFormSchema>>({
    resolver: zodResolver(voiceFormSchema),
    defaultValues: {
      prompt: "",
      voice_id: "",
      optimize_streaming_latency: true,
      output_format: "mp3_22050_32",
      text: "",
      stability: 0.5,
      similarity_boost: 0.5,
      style: 0.5,
      amount: 1,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof voiceFormSchema>) => {
    try {
      setVoices([]);
      const constructedPrompt = constructVoicePrompt(values);
      const apiUrl = modelData?.replicate_id
        ? `/api/voice/${modelData.replicate_id}`
        : `/api/voice/${modelId}`;

      const payload = {
        prompt: constructedPrompt,
        voiceId: values.voice_id,
        optimize_streaming_latency: values.optimize_streaming_latency,
        output_format: values.output_format,
        text: values.text,
        stability: values.stability,
        similarity_boost: values.similarity_boost,
        style: values.style,
        amount: values.amount,
      };

      const response = await axios.post(apiUrl, payload);
      setVoices(response.data.voices);
      form.reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  const renderSidebarContent = () => (
    <aside className={cn("w-full p-6 bg-gray-800 text-gray-200 relative", montserrat.className)}>
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
      <h2 className="text-2xl font-semibold mb-6 text-white">Voice Parameters</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
          {/* Voice ID Selection */}
          <FormItem className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Voice ID</label>
            <div className="flex flex-wrap gap-2">
              {parameterDefinitions.txt2audio
                .find((param) => param.name === "voice_id")
                ?.options.map((option) => {
                  const watchedValue = form.watch("voice_id");
                  const isSelected = watchedValue === option.value;

                  return (
                    <Button
                      key={option.value}
                      type="button"
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-transform transform",
                        isSelected
                          ? "bg-gradient-to-r from-purple-800 to-pink-500 text-white scale-105"
                          : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      )}
                      onClick={() => form.setValue("voice_id", option.value)}
                    >
                      {option.label}
                    </Button>
                  );
                })}
            </div>
          </FormItem>

          {/* Optimize Streaming Latency Toggle */}
          <FormItem>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Optimize Streaming Latency</label>
              <Switch
                checked={form.watch("optimize_streaming_latency")}
                onChange={(checked: boolean) => form.setValue("optimize_streaming_latency", checked)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
                  form.watch("optimize_streaming_latency")
                    ? "bg-gradient-to-r from-purple-800 to-pink-500"
                    : "bg-gray-300"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform bg-white rounded-full transition-transform duration-200",
                    form.watch("optimize_streaming_latency") ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </Switch>
            </div>
          </FormItem>

          {/* Output Format Selection */}
          <FormItem className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Output Format</label>
            <FormControl>
              <div role="radiogroup" className="space-y-2">
                {parameterDefinitions.txt2audio
                  .find((param) => param.name === "output_format")
                  ?.options.map((option) => {
                    const checked = form.watch("output_format") === option.value;
                    return (
                      <div
                        key={option.value}
                        onClick={() => form.setValue("output_format", option.value)}
                        className="cursor-pointer flex items-center"
                        role="radio"
                        aria-checked={checked}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            form.setValue("output_format", option.value);
                          }
                        }}
                      >
                        <div
                          className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 border ${
                            checked ? "border-transparent" : "border-gray-300"
                          }`}
                          style={{
                            background: checked
                              ? "radial-gradient(circle at center, #4b0082, #ff69b4)"
                              : "white",
                          }}
                        >
                          {checked && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span className={`${checked ? "text-gray-300" : "text-gray-400"}`}>
                          {option.label}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </FormControl>
          </FormItem>

          {/* Text Input */}
          <FormField
            name="text"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <label className="block text-sm font-medium text-gray-300">Text</label>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:border-purple-500 focus:ring-purple-500 sm:text-sm pl-3 py-2"
                    placeholder="Enter text to be converted to speech"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Stability, Similarity Boost, and Style Inputs */}
          {["stability", "similarity_boost", "style"].map((param) => (
            <FormField
              key={param}
              name={param as keyof z.infer<typeof voiceFormSchema>}
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <label className="block text-sm font-medium text-gray-300 capitalize">
                    {param.replace("_", " ")}
                  </label>
                  <FormControl>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      {...field}
                      className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-200 focus:border-purple-500 focus:ring-purple-500 sm:text-sm h-10 pl-3"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          {/* Amount Slider */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-800 to-pink-500 text-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            {isLoading ? <Loader className="mr-2 animate-spin" /> : "Generate Voice"}
          </Button>
        </form>
      </Form>
    </aside>
  );

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

      <main className="flex-1 flex flex-col justify-start items-center p-2 sm:p-6 bg-gray-900 text-gray-200">
        <h2 className="text-2xl font-bold text-white mb-8">Generated Voices</h2>
        {isLoading && <Loader className="text-gray-200 animate-spin" />}
        {!voices.length && !isLoading && <Empty label="No voices generated yet." />}
        {voices.length > 0 && (
          <div className="space-y-4 w-full">
            {voices.map((voiceUrl, idx) => (
              <audio key={idx} controls className="w-full shadow-md rounded-lg bg-gray-700 border border-gray-600">
                <source src={voiceUrl} />
              </audio>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
