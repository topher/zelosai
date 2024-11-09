// /app/(dashboard)/(routes)/workflows/library/page.tsx

"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { WorkflowCard } from "@/app/(dashboard)/(routes)/workflows/library/components/workflow-card"
import { Workflow } from "@/app/types";

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resource/workflows");
        if (response.ok) {
          const data = await response.json();
          setWorkflows(data.resources);
        } else {
          console.error("Error fetching workflows:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching workflows:", error);
      }
    };
    fetchData();
  }, []);


  const user_defined_workflows = workflows.filter((workflow) => workflow.workflow_creator === "user_defined");
  const suggested_workflows = workflows.filter((workflow) => workflow.workflow_creator === "suggested_workflow");

  return (
    <div>
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <Tabs defaultValue="active" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="active" className="relative">Active</TabsTrigger>
                      <TabsTrigger value="draft">Drafts</TabsTrigger>
                      <TabsTrigger value="live" disabled>Archive</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto mr-4">
                      <Button>Create New Workflow</Button>
                    </div>
                  </div>
                  <TabsContent value="active" className="border-none p-0 outline-none">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        {user_defined_workflows.map((workflow: Workflow) => (
                          <WorkflowCard
                            key={workflow.name}
                            album={workflow}
                            className="w-[250px]"
                            aspectRatio="portrait"
                            width={250}
                            height={330}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <h2 className="text-2xl font-semibold tracking-tight">Suggested</h2>
                    <p className="text-sm text-muted-foreground">Save time and stress with custom workflows</p>
                    <Separator className="my-4" />
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        {suggested_workflows.map((workflow: Workflow) => (
                          <WorkflowCard
                            key={workflow.name}
                            album={workflow}
                            className="w-[150px]"
                            aspectRatio="square"
                            width={150}
                            height={150}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="draft" className="h-full flex-col border-none p-0 data-[state=active]:flex">
                    <h2 className="text-2xl font-semibold tracking-tight">Continue building</h2>
                    <p className="text-sm text-muted-foreground">Tasks, Roles, and automations aligned with your strategic goals.</p>
                    <Separator className="my-4" />
                    <div>No drafts found</div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
