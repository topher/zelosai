"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger, DialogContent, DialogOverlay } from "@radix-ui/react-dialog";
import AccessRightsForm from "./components/rule-form";
import RulesList from "./components/rules-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRulesByAccountId, createRule } from "@/app/actions/rulesActions";
import { Rule } from "@/app/types";
import { useRouter } from "next/navigation";

const accountId = "12345"; // Replace this with the actual accountId from your context or state

export default function RulesLayout() {
  const router = useRouter();
  const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the rules from Elasticsearch based on the accountId
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const fetchedRules = await getRulesByAccountId(accountId);
        setRules(fetchedRules);
      } catch (err) {
        setError("Failed to load rules.");
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  // Filter rules based on type
  const accessRules = rules.filter((rule: Rule) => rule.ruleType === "access");
  const actionRules = rules.filter((rule: Rule) => rule.ruleType === "action");
  const contentRules = rules.filter((rule: Rule) => rule.ruleType === "content");

  const handleOpenCreateRuleModal = () => {
    setIsCreateRuleModalOpen(true);
    router.push('/knowledge-bank/rules/create-rule?openModal=true');
  };

  const handleCloseCreateRuleModal = () => setIsCreateRuleModalOpen(false);

  if (loading) return <p>Loading rules...</p>;
  if (error) return <p>{error}</p>;

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
                  Access Rules
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
        </div>
        {isCreateRuleModalOpen && (
          <Dialog open={isCreateRuleModalOpen} onOpenChange={setIsCreateRuleModalOpen}>
            <DialogTrigger asChild>
              <Button>Cancel</Button>
            </DialogTrigger>
            <DialogContent>
              <AccessRightsForm />
            </DialogContent>
            <DialogOverlay onClick={handleCloseCreateRuleModal} />
          </Dialog>
        )}
      </div>
    </>
  );
}
