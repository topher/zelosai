// components/generationForms/TextInputForm.tsx
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

import { TextResponseCard } from "../generationCards/TextResponseCard";
import { textFormSchema, parameterDefinitions } from "../constants";
import { ParameterField } from "./ParameterField";

interface TextInputFormProps {
  modelId: string;
  modelData: any; // Replace with your AIModel type
  onResponse: (message: string, role: "user" | "assistant") => void;
}

export const TextInputForm: React.FC<TextInputFormProps> = ({ modelId, modelData, onResponse }) => {
  const router = useRouter();
  const [messages, setMessages] = useState<{ content: string; role: "user" | "assistant" }[]>([]);

  // Dynamically extend the form schema based on parameters
  const dynamicFormSchema = textFormSchema.extend({
    speaker: z.string().min(1, "Speaker is required"),
    hearer: z.string().min(1, "Hearer is required"),
    when: z.string().min(1, "When is required"),
    where: z.string().min(1, "Where is required"),
    why: z.string().min(1, "Why is required"),
    what: z.string().min(1, "What is required"),
  });

  const form = useForm<z.infer<typeof dynamicFormSchema>>({
    resolver: zodResolver(dynamicFormSchema),
    defaultValues: {
      prompt: "",
      speaker: parameterDefinitions.txt2txt.find(p => p.name === "speaker")?.default || "",
      hearer: parameterDefinitions.txt2txt.find(p => p.name === "hearer")?.default || "",
      when: parameterDefinitions.txt2txt.find(p => p.name === "when")?.default || "",
      where: parameterDefinitions.txt2txt.find(p => p.name === "where")?.default || "",
      why: parameterDefinitions.txt2txt.find(p => p.name === "why")?.default || "",
      what: parameterDefinitions.txt2txt.find(p => p.name === "what")?.default || "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof dynamicFormSchema>) => {
    try {
      const userMessage = {
        role: "user" as const,
        content: values.prompt,
      };
      setMessages((prev) => [...prev, userMessage]);

      const response = await axios.post(`/api/text/${modelId}`, {
        messages: [...messages, userMessage],
        default_language: modelData?.default_language,
        // Include additional parameters if necessary
      });

      const assistantMessage = {
        role: "assistant" as const,
        content: response.data.generated_text,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      onResponse(assistantMessage.content, assistantMessage.role);
      form.reset();
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
        {parameterDefinitions.txt2txt.map((param) => (
          <ParameterField key={param.name} parameter={param} />
        ))}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader /> : "Generate"}
        </Button>
      </form>
    </Form>
  );
};
