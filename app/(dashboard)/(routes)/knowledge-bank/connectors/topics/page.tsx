"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Topic } from "@/app/types"; // Ensure Topic is imported
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@clerk/nextjs";

// Define Zod schema for adding a new topic
const addTopicSchema = z.object({
  topicName: z.string().min(1, "Topic name is required."),
  category: z.string().min(1, "Category is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

type AddTopicFormValues = z.infer<typeof addTopicSchema>;

const TopicsPage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddTopicFormValues>({
    resolver: zodResolver(addTopicSchema),
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
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };
    fetchTopics();
  }, [user]);


  // Handle toggle subscription
  const handleToggleSubscription = (index: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, i) =>
        i === index ? { ...topic, visibility: topic.visibility === 'public' ? 'private' : 'public' } : topic
      )
    );
  };

  // Handle adding a new topic
  const onSubmit = (data: AddTopicFormValues) => {
    const newTopic: Topic = {
      id: `topic-${topics.length + 1}`, // Generate a unique ID
      accountId: "account-123", // Replace with dynamic accountId
      resourceType: "Topic",
      ownerId: "user-456", // Replace with dynamic userId
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["AI", data.category], // Example tags
      visibility: "private",
      category: data.category,
      description: data.description,
      preferences: ["AI-driven analytics", "Cycling technology", "Branding strategies"], // Example preferences
      influencerName: "Alex Rider",
      brand: "CycleAI Pro",
    };
    setTopics([newTopic, ...topics]);
    reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Topics</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscribed topics and view related insights.
        </p>
      </div>
      <Separator />

      {/* Add New Topic Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register("topicName")}
            type="text"
            placeholder="Add a new topic"
            className="w-full"
          />
          {errors.topicName && (
            <p className="text-red-500 text-sm">{errors.topicName.message}</p>
          )}
        </div>
        <div>
          <Input
            {...register("category")}
            type="text"
            placeholder="Category (e.g., Cycling, AI Entrepreneurship)"
            className="w-full"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div>
          <Input
            {...register("description")}
            type="text"
            placeholder="Description"
            className="w-full"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <Button type="submit">Add Topic</Button>
      </form>

      {/* Topics List */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topics.map((topic, index) => (
          <Card key={topic.id}>
            <CardHeader>
              <CardTitle>{topic.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">{topic.category}</p>
                <p className="text-sm text-muted-foreground">
                  Description: {topic.description}
                </p>
              </div>
              {topic.preferences && topic.preferences.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm font-medium">Preferences:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {topic.preferences.map((pref, i) => (
                      <Badge key={i} variant="default">
                        {pref}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-muted-foreground">Visibility: {topic.visibility}</p>
                <Switch
                  checked={topic.visibility === 'public'}
                  onCheckedChange={() => handleToggleSubscription(index)}
                  className="w-10 h-6 bg-gray-200 rounded-full relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                      topic.visibility === 'public' ? "translate-x-4" : "translate-x-0"
                    }`}
                  ></span>
                </Switch>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
