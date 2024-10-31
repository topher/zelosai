// text/components/generationTabs/TextGenerationTab.tsx

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

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Empty } from "@/components/ui/empty";
import { parameterDefinitions, textFormSchema } from "../../../components/constants";
import CustomAmountSlider from "app/(dashboard)/(routes)/models/components/CustomAmountSlider";

import { constructTextPrompt } from "@/utils/promptBuilder";

interface TextGenerationTabProps {
  modelId: string | undefined;
  modelData: any;
}

export const TextGenerationTab: React.FC<TextGenerationTabProps> = ({ modelId, modelData }) => {
  const router = useRouter();
  const [responseTexts, setResponseTexts] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const form = useForm<z.infer<typeof textFormSchema>>({
    resolver: zodResolver(textFormSchema),
    defaultValues: {
      prompt: "",
      speaker: "brand official channel",
      hearer: "general audience",
      when: "weekly",
      where: "social media platforms",
      why: "to promote engagement",
      what: "promote products",
      amount: 1,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof textFormSchema>) => {
    try {
      setResponseTexts([]);
      const constructedPrompt = constructTextPrompt(values);
      const apiUrl = modelData?.replicate_id ? `/api/text/${modelData.replicate_id}` : `/api/text/${modelId}`;
      const response = await axios.post(apiUrl, { prompt: constructedPrompt, amount: values.amount });
      setResponseTexts(response.data.generated_texts);
      form.reset();
    } catch (error: unknown) {
      const errorMessage = (error as any)?.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
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
          <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-[#4b0082] to-[#ff69b4] text-white">
            {isLoading ? <Loader className="mr-2 animate-spin" /> : "Generate Text"}
          </Button>
        </form>
      </Form>
    </aside>
  );

  return (
    <div className="flex flex-1 bg-white">
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
            PaperProps={{ style: { backgroundColor: "#f4f4f4", width: "75vw" } }}
          >
            {renderSidebarContent()}
          </Drawer>
        </>
      ) : (
        <aside className="w-1/4 bg-offWhite">
          {renderSidebarContent()}
        </aside>
      )}
      <main className="w-3/4 flex flex-col justify-center items-center p-12 overflow-auto">
        <h2 className="text-2xl font-bold text-darkGray mb-8">Generated Texts</h2>
        {isLoading && <Loader />}
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
