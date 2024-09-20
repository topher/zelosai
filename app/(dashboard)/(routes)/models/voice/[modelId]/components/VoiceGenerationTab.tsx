// components/generationTabs/VoiceGenerationTab.tsx

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
import { parameterDefinitions, voiceFormSchema } from "../../../components/constants";
import { ParameterField } from "../../../components/generationForms/ParameterField"; 


import { constructVoicePrompt } from "@/utils/promptBuilder";

interface VoiceGenerationTabProps {
  modelId: string | undefined;
  modelData: any; // Replace with AIModel type if applicable
}

export const VoiceGenerationTab: React.FC<VoiceGenerationTabProps> = ({ modelId, modelData }) => {
  const router = useRouter();
  const [voices, setVoices] = useState<string[]>([]);

  // Initialize form with voiceFormSchema
  const form = useForm<z.infer<typeof voiceFormSchema>>({
    resolver: zodResolver(voiceFormSchema),
    defaultValues: {
      prompt: "",
      voice_id: "",
      optimize_streaming_latency: "",
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

      // Construct the prompt using helper function
      const constructedPrompt = constructVoicePrompt(values);

      // Determine the API endpoint using replicate_id
      const apiUrl = modelData?.replicate_id
        ? `/api/voice/${modelData.replicate_id}`
        : `/api/voice/${modelId}`; // Fallback if replicate_id not available

      const payload = {
        prompt: constructedPrompt,
        voiceId: values.voice_id,
        output_format: values.output_format,
        amount: values.amount, // amount is ensured by Zod schema
      };

      const response = await axios.post(apiUrl, payload, {
        responseType: "arraybuffer",
      });

      // Assuming the response contains an array of audio URLs
      setVoices(response.data.voices);
      form.reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar remains unchanged */}
      <aside className="w-1/4 bg-gray-50 border-r border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Voice Parameters</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Dynamically render form fields based on txt2audio */}
            {parameterDefinitions.txt2audio.map((param) => (
              <ParameterField key={param.name} parameter={param} />
            ))}
            {/* Amount of Generations */}
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
            <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white hover:bg-blue-700">
              {isLoading ? <Loader className="mr-2" /> : "Generate Voice"}
            </Button>
          </form>
        </Form>
      </aside>

      {/* Main content */}
      <main className="w-3/4 flex flex-col justify-center items-center p-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Generated Voices</h2>
        {isLoading && <Loader />}
        {!voices.length && !isLoading && <Empty label="No voices generated yet." />}
        {voices.length > 0 && (
          <div className="space-y-4 w-full">
            {voices.map((voiceUrl, idx) => (
              <audio key={idx} controls className="w-full shadow-md rounded-lg">
                <source src={voiceUrl} />
              </audio>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
