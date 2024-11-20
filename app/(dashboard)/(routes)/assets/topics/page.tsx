// /app/(dashboard)/(routes)/assets/topics/page.tsx

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Topic } from "@/app/types";
import { useUser } from "@clerk/nextjs";
import CardGridLayout from "@/app/components/atomic/templates/CardGridLayout";
import TopicCard from "@/app/components/atomic/molecules/TopicCard";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

// Define Zod schema for adding a new topic
const addTopicSchema = z.object({
  topicName: z.string().min(1, "Topic name is required."),
  category: z.string().min(1, "Category is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});

type AddTopicFormValues = z.infer<typeof addTopicSchema>;

const TopicsPage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddTopicDialogOpen, setIsAddTopicDialogOpen] = useState<boolean>(
    false
  );

  const form = useForm<AddTopicFormValues>({
    resolver: zodResolver(addTopicSchema),
    defaultValues: {
      topicName: "",
      category: "",
      description: "",
    },
  });

  const { user } = useUser();

  useEffect(() => {
    const fetchTopics = async () => {
      if (!user) return;
      try {
        const response = await fetch("/api/resource/topics");
        if (response.ok) {
          const data = await response.json();
          setTopics(data.resources);
        } else {
          console.error("Failed to fetch topics:", response.statusText);
          setError("Failed to load topics.");
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
        setError("Error fetching topics.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopics();
  }, [user]);

  const handleToggleSubscription = (topicId: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              visibility: topic.visibility === "public" ? "private" : "public",
            }
          : topic
      )
    );
  };

  const onSubmit: SubmitHandler<AddTopicFormValues> = (data) => {
    const newTopic: Topic = {
      id: `topic-${topics.length + 1}`,
      accountId: "account-123",
      resourceType: "Topic",
      ownerId: "user-456",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["AI", data.category],
      visibility: "private",
      category: data.category,
      description: data.description,
      preferences: [
        "AI-driven analytics",
        "Cycling technology",
        "Branding strategies",
      ],
      influencerName: "Alex Rider",
      brand: "CycleAI Pro",
    };
    setTopics([newTopic, ...topics]);
    form.reset();
    setIsAddTopicDialogOpen(false); // Close the dialog after adding
  };

  return (
    <CardGridLayout<Topic>
      header={{
        title: "My Topics",
        description: "Manage your subscribed topics and view related insights.",
        actions: (
          <Dialog
            open={isAddTopicDialogOpen}
            onOpenChange={setIsAddTopicDialogOpen}
          >
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddTopicDialogOpen(true)}>
                + Add Topic
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Topic</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new topic.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    name="topicName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Topic Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Category (e.g., Cycling, AI Entrepreneurship)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddTopicDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Add Topic</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        ),
      }}
      isLoading={isLoading}
      error={error}
      items={topics}
      renderItem={(topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          onToggleSubscription={handleToggleSubscription}
        />
      )}
    />
  );
};

export default TopicsPage;
