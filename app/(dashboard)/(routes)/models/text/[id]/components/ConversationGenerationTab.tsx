// components/generationTabs/TextGenerationTab.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Empty } from "@/components/ui/empty";
import { parameterDefinitions, textFormSchema } from "../../../components/constants";
import { ParameterField } from "../../../components/generationForms/ParameterField"; 

import { constructTextPrompt } from "@/utils/promptBuilder";

interface TextGenerationTabProps {
  modelId: string | undefined;
  modelData: any; // Replace with AIModel type if applicable
}

export const TextGenerationTab: React.FC<TextGenerationTabProps> = ({ modelId, modelData }) => {
  const router = useRouter();
  const [responseTexts, setResponseTexts] = useState<string[]>([]);
  
  // Initialize form with textFormSchema
  const form = useForm<z.infer<typeof textFormSchema>>({
    resolver: zodResolver(textFormSchema),
    defaultValues: {
      prompt: "",
      speaker: "",
      hearer: "",
      when: "",
      where: "",
      why: "",
      what: "",
      amount: 1,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof textFormSchema>) => {
    try {
      setResponseTexts([]);

      // Construct the prompt using helper function
      const constructedPrompt = constructTextPrompt(values);

      // Determine the API endpoint using replicate_id
      const apiUrl = modelData?.replicate_id
        ? `/api/text/${modelData.replicate_id}`
        : `/api/text/${modelId}`; // Fallback if replicate_id not available

      const payload = {
        prompt: constructedPrompt,
        amount: values.amount, // amount is ensured by Zod schema
      };

      const response = await axios.post(apiUrl, payload);

      // Assuming the response contains an array of generated texts
      setResponseTexts(response.data.generated_texts);
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
        <h2 className="text-xl font-semibold mb-6 text-gray-700">Text Parameters</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Dynamically render form fields based on txt2txt */}
            {parameterDefinitions.txt2txt.map((param) => (
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
            <Button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white hover:bg-green-700">
              {isLoading ? <Loader className="mr-2" /> : "Generate Text"}
            </Button>
          </form>
        </Form>
      </aside>

      {/* Main content */}
      <main className="w-3/4 flex flex-col justify-center items-center p-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Generated Texts</h2>
        {isLoading && <Loader />}
        {!responseTexts.length && !isLoading && <Empty label="No texts generated yet." />}
        {responseTexts.length > 0 && (
          <div className="space-y-4 w-full">
            {responseTexts.map((text, idx) => (
              <div key={idx} className="bg-gray-100 p-6 shadow-md rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{text}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
