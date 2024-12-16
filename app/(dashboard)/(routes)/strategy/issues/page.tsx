// /app/(dashboard)/(routes)/strategy/issues/page.tsx

"use client";

import { useEffect, useState } from "react";
import CardGridLayout from "@/app/components/atomic/templates/CardGridLayout";
import IssueCard from "@/app/components/atomic/molecules/cards/IssueCard";
import { StategicIssue } from "@/app/types";
import { issues as issuesDemoData } from "@/app/data";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const IssuesPage = () => {
  const [issues, setIssues] = useState<StategicIssue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resource/issues");
        if (response.ok) {
          const data = await response.json();
          setIssues(data.resources);
        } else {
          console.error("Error fetching strategic issues:", response.statusText);
          setError(`Failed to fetch issues: ${response.statusText}`);
        }
      } catch (error: any) {
        console.error("Error fetching strategic issues:", error);
        setError(`Error fetching issues: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const header = {
    title: "Issues",
    description: "List of issues and topics related to your organization.",
    actions: (
      <Button>
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        Add New Issue
      </Button>
    ),
  };

  return (
    <CardGridLayout
      header={header}
      isLoading={isLoading}
      error={error}
      items={issues}
      renderItem={(issue: StategicIssue) => <IssueCard key={issue.id} issue={issue} />}
    />
  );
};

export default IssuesPage;
