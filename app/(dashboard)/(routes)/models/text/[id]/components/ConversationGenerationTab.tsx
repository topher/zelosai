// text/components/generationTabs/TextGenerationTab.tsx

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
import CustomAmountSlider from "app/(dashboard)/(routes)/models/components/CustomAmountSlider";

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

      const constructedPrompt = constructTextPrompt(values);

      const apiUrl = modelData?.replicate_id
        ? `/api/text/${modelData.replicate_id}`
        : `/api/text/${modelId}`;

      const payload = {
        prompt: constructedPrompt,
        amount: values.amount,
      };

      const response = await axios.post(apiUrl, payload);
      setResponseTexts(response.data.generated_texts);
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
        <h2 className="text-xl font-semibold mb-6 text-darkGray">Text Parameters</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
            {parameterDefinitions.txt2txt.map((param) => (
              <FormItem key={param.name} className="space-y-2">
                <label className="block text-sm font-medium text-darkGray">{param.label}</label>
                <div className="flex flex-wrap gap-2">
                  {param.options.map((option) => {
                    const watchedValue = form.watch(param.name as keyof z.infer<typeof textFormSchema>);
                    const isSelected = watchedValue === option.value;

                    return (
                      <Button
                        key={option.value}
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-md 
                          ${isSelected ? 'bg-gradient-to-r from-[#4b0082] to-[#ff69b4] text-white' : 'bg-white text-darkGray hover:bg-[#b366e2] hover:text-white'}
                        `}
                        onClick={() => form.setValue(param.name as keyof z.infer<typeof textFormSchema>, option.value)}
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
            <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#4b0082] to-[#ff69b4] text-white transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              {isLoading ? <Loader className="mr-2 animate-spin" /> : "Generate Text"}
            </Button>
          </form>
        </Form>
      </aside>

      <main className="w-full flex flex-col justify-center items-center p-12 overflow-auto">
        <h2 className="text-2xl font-bold text-darkGray mb-8">Generated Texts</h2>
        {isLoading && <Loader className="animate-spin" />}
        {!responseTexts.length && !isLoading && <Empty label="No texts generated yet." />}
        {responseTexts.length > 0 && (
          <div className="space-y-4 w-full">
            {responseTexts.map((text, idx) => (
              <div key={idx} className="bg-gray-100 p-6 shadow-md rounded-lg">
                <p className="text-darkGray whitespace-pre-line">{text}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
