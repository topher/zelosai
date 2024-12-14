// app/(dashboard)/(routes)/workflows/library/page.tsx

"use client";

import { useEffect, useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import LibraryLayout from "@/app/components/atomic/templates/LibraryLayout";
import { WorkflowCard } from "./components/workflow-card";
import { Workflow } from "@/app/types";

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch workflows data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resource/workflows");
        if (response.ok) {
          const data = await response.json();
          setWorkflows(data.resources);
        } else {
          console.error("Error fetching workflows:", response.statusText);
          setError("Error fetching workflows");
        }
      } catch (error) {
        console.error("Error fetching workflows:", error);
        setError("Error fetching workflows");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Define header for LibraryLayout
  const header = {
    title: "Workflows",
    description: "Manage your workflows and automate processes.",
    actions: (
      <Button>
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        Create New Workflow
      </Button>
    ),
  };

  // Categorize workflows
  const userDefinedWorkflows = workflows.filter(
    (workflow) => workflow.workflow_creator === "user_defined"
  );

  const suggestedWorkflows = workflows.filter(
    (workflow) => workflow.workflow_creator === "suggested_workflow"
  );

  // Define standard card properties
  const standardCardProps = {
    aspectRatio: "landscape",
    width: 300,
    height: 225,
  };

  // Define tabs for LibraryLayout
  const tabs = [
    {
      value: "active",
      label: "Active",
      categories: [
        {
          name: "Active Workflows",
          items: userDefinedWorkflows,
          cardProps: standardCardProps,
        },
        {
          name: "Suggested Workflows",
          items: suggestedWorkflows,
          cardProps: standardCardProps,
        },
      ],
    },
    {
      value: "draft",
      label: "Drafts",
      content: <div>No drafts found</div>,
    },
    {
      value: "archive",
      label: "Archive",
      categories: [], // Add archive categories if needed
    },
  ];

  // Define itemLink function
  const itemLink = (workflow: Workflow) => `/workflows/${workflow.id}`;

  // Render LibraryLayout
  return (
    <LibraryLayout<Workflow>
      header={header}
      tabs={tabs}
      isLoading={loading}
      error={error}
      cardComponent={({ item, ...props }) => (
        <WorkflowCard item={item} {...props} />
      )}
      itemLink={itemLink}
    />
  );
}
