// TopicsPage.tsx (Updated)
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { StategicIssue } from "@/app/types";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { issues as issuesDemoData } from "@/app/data";

// Define Zod schema for adding a new topic
const addTopicSchema = z.object({
  topicName: z.string().min(1, "Topic name is required."),
});

type AddTopicFormValues = z.infer<typeof addTopicSchema>;

const TopicsPage = () => {
  const [issues, setIssues] = useState<StategicIssue[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddTopicFormValues>({
    resolver: zodResolver(addTopicSchema),
  });

  useEffect(() => {
    // Set issues data when component mounts
    setIssues(issuesDemoData); // Corrected to use issuesDemoData
  }, []);

  // Handle toggle subscription
  const handleToggleSubscription = (index: number) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue, i) =>
        i === index ? { ...issue, Subscribed: !issue.Subscribed } : issue
      )
    );
  };

  // Handle adding a new topic
  const onSubmit = (data: AddTopicFormValues) => {
    const newTopic: StategicIssue = {
      // id: `topic-${issues.length + 1}`, // Generate a unique ID
      Topic: data.topicName,
      "SWOT Type": "Opportunity", // Example value
      Subscribed: true,
      RelatedGoals: [],
      RelatedUseCases: [],
    };
    setIssues([newTopic, ...issues]);
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2">
        <Input
          {...register("topicName")}
          type="text"
          placeholder="Add a new topic"
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>
      {errors.topicName && (
        <p className="text-red-500 text-sm">{errors.topicName.message}</p>
      )}

      {/* Topics List */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {issues.map((issue, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{issue.Topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">{issue["SWOT Type"]}</p>
                <p className="text-sm text-muted-foreground">
                  Subscribed: {issue.Subscribed.toString()}
                </p>
              </div>
              {issue.RelatedGoals && issue.RelatedGoals.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm font-medium">Related Goals:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {issue.RelatedGoals.map((goal, i) => (
                      <Badge key={i} variant="default">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {issue.RelatedUseCases && issue.RelatedUseCases.length > 0 && (
                <div>
                  <p className="text-sm font-medium">Related Use Cases:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {issue.RelatedUseCases.map((useCase, i) => (
                      <Badge key={i} variant="secondary">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-muted-foreground">Active</p>
                <Switch
                  checked={issue.Subscribed}
                  onCheckedChange={() => handleToggleSubscription(index)}
                  className="w-10 h-6 bg-gray-200 rounded-full relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span
                    className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                      issue.Subscribed ? "translate-x-4" : "translate-x-0"
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
