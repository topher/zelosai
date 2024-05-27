import { Metadata } from "next"
import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { WorkflowCard } from "./components/workflow-card"
import { Menu } from "./components/menu"
import { WorkflowEmptyPlaceholder } from "./components/workflow-empty-placeholder"
import { Sidebar } from "./components/sidebar"
import { workflows } from "@/app/data"
import { Workflow } from "@/app/types"



export const metadata: Metadata = {
  title: "Workflows",
  description: "Example campaign app using the Generative AI Models.",
}

export default function MusicPage() {

  const user_defined_workflows = workflows.filter(
    (workflow) => workflow.workflow_creator === "user_defined"
  );
  
  const suggested_workflows = workflows.filter(
    (workflow) => workflow.workflow_creator === "suggested_workflow"
  );
 
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        {/* <Menu /> */}
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar workflows={workflows} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="active" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="active" className="relative">
                          Active
                        </TabsTrigger>
                        <TabsTrigger value="draft">Drafts</TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          Archive
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>
                          <PlusCircledIcon className="mr-2 h-4 w-4" />
                          Create New Workflow
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="active"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Continue working on
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your key items today – You got this!
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {user_defined_workflows.map((campaign: Workflow) => (
                              <WorkflowCard
                                key={campaign.name}
                                album={campaign}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Suggested
                        </h2>
                        <p className="text-sm text-muted-foreground">
                        Save time and stress with custom workflows
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
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
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="draft"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Continue building
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Tasks, Roles, and automations aligned with you strategic goals.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <WorkflowEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
