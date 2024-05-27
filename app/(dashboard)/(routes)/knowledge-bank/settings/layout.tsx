"use client"
import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"
// Import from radix-ui
import { Dialog, DialogTrigger, DialogContent, DialogOverlay } from '@radix-ui/react-dialog';
import AccessRightsForm from "./components/rule-form"
import { useState } from "react"
import RulesList from "./components/rules-list"
import { rules } from "@/app/data"; // Assuming rules data is defined here
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import{ Rule } from "@/app/types"

interface RulesLayoutProps {
  children: React.ReactNode
}

export default function RulesLayout({ children }: RulesLayoutProps) {
  const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);

  const handleOpenCreateRuleModal = () => setIsCreateRuleModalOpen(true);
  const handleCloseCreateRuleModal = () => setIsCreateRuleModalOpen(false);

  // Assuming the rules data is structured with a "ruleType" property
  const accessRules = rules.filter((rule: Rule) => rule.ruleType === "access");
  const actionRules = rules.filter((rule: Rule) => rule.ruleType === "action");
  const contentRules = rules.filter((rule: Rule) => rule.ruleType === "content");

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">My Rules</h2>
          <p className="text-muted-foreground">
            Manage your account rules across compliance frameworks.
          </p>
        </div>
        <div className="ml-auto mr-4">
            <Button onClick={handleOpenCreateRuleModal}>
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              New Rule
            </Button>
          </div>
    <div className="space-y-6">
      <Tabs defaultValue="access_rules" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="access_rules" className="relative">
              Access Rule
            </TabsTrigger>
            <TabsTrigger value="action_rules">
              Action Rules
            </TabsTrigger>
            <TabsTrigger value="content_rules">
              Content Rules
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator className="my-6" />
        <TabsContent value="access_rules" className="border-none p-0 outline-none">
          <RulesList rules={accessRules} />
        </TabsContent>
        <TabsContent value="action_rules" className="border-none p-0 outline-none">
          <RulesList rules={actionRules} />
        </TabsContent>
        <TabsContent value="content_rules" className="border-none p-0 outline-none">
        <RulesList rules={contentRules} />
        </TabsContent>
      </Tabs>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
              {/* Create Rule Modal (using radix-ui) */}
              {isCreateRuleModalOpen && (
              <Dialog open={isCreateRuleModalOpen} onOpenChange={setIsCreateRuleModalOpen}>
                <DialogTrigger asChild>
                  <Button>Cancel</Button>  {/* Assuming a cancel button exists in the form */}
                </DialogTrigger>
                <>
                  <DialogContent>
                    {/* Pass AccessRightsForm as a child here */}
                    <AccessRightsForm />
                  </DialogContent>
                </>
                <DialogOverlay onClick={handleCloseCreateRuleModal} />
              </Dialog>
            )}
      </div>
      </div>
    </>
  )
}
