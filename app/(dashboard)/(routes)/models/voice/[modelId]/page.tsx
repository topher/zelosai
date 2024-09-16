"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { Send, FileAudio } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";
import { AIModel } from "@/app/types";

export default function VoicePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const router = useRouter();
  const pathname = usePathname();
  const modelId = pathname.split("/").pop();
  const proModal = useProModal();
  const [voice, setVoice] = useState<string>();
  const [data, setData] = useState<AIModel | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(`/api/models/${modelId}`);
        setData(response.data);
      } catch (error) {
        toast.error("Failed to load model data.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [modelId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVoice(undefined);

      if (!data) {
        console.error("No model data available.");
        return;
      }

      const response = await axios.post(`/api/voice`, {
        ...values,
        modelId: data.elabs_model_id,
        voiceId: data.elabs_voice_id,
      }, {
        responseType: 'arraybuffer'
      });

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      setVoice(audioUrl);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Voice Generation"
        description="Turn your prompt into a custom voice."
        icon={FileAudio}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2">
            <FormItem className="col-span-12 lg:col-span-10">
              <FormControl className="m-0 p-0">
                <Input
                  className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  disabled={isLoading}
                  placeholder="Hi my name is..."
                  {...form.register("prompt")}
                />
              </FormControl>
            </FormItem>
            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!voice && !isLoading && (
          <Empty label="No voice generated." />
        )}
        {voice && (
          <audio controls className="w-full mt-8">
            <source src={voice} />
          </audio>
        )}
      </div>
    </div>
  );
}
