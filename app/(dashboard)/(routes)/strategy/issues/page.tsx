"use client" 
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { issues as issuesDemoData } from "@/app/data";
import { useEffect, useState } from "react";
import { Switch } from "@radix-ui/react-switch";
import { Badge } from "@/components/ui/badge";
import { StategicIssue } from "@/app/types";
import StrategyLayout from "../../../../components/atomic/templates/StrategyLayout";

const IssuesPage = () => {
  // Initialize state with empty array
  const [issues, setIssues] = useState<StategicIssue[]>([]);;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resource/issues");
        if (response.ok) {
          const data = await response.json();
          setIssues(data.resources);
        } else {
          console.error("Error fetching strategic issues:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching strategic issues:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <StrategyLayout>
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-medium">Issues</h3>
        <p className="text-sm text-muted-foreground">
          List of issues and topics related to your organization.
        </p>
      </div>
      <Separator />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {issues.map((issue, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{issue.Topic}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">{issue["SWOT Type"]}</p>
              <p className="text-sm text-muted-foreground">Subscribed: {issue.Subscribed.toString()}</p>
            </div>
            {issue.RelatedGoals && (
              <div className="mb-2">
                <p className="text-sm font-medium">Related Goals:</p>
                {issue.RelatedGoals.map((goal, i) => (
                  <Badge key={i} variant="default">{goal}</Badge>
                ))}
              </div>
            )}
            {issue.RelatedUseCases && (
              <div>
                <p className="text-sm font-medium">Related Use Cases:</p>
                {issue.RelatedUseCases.map((useCase, i) => (
                  <Badge key={i} variant="secondary">{useCase}</Badge>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Active</p>
              <Switch />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>
  </StrategyLayout>
  );
}

export default IssuesPage;


