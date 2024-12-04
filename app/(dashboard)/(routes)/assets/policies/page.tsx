// /app/(dashboard)/(routes)/assets/policies/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
} from '@radix-ui/react-dialog';
import AccessRightsForm from './components/rule-form';
import RulesList from './components/rules-list';
import PolicyList from './components/policy-list'; // Import PolicyList
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { getRulesByAccountId } from '@/app/actions/rulesActions';
import { getPoliciesByAccountId } from '@/app/actions/policiesActions'; // Import policies action
import { Rule, Policy } from '@/app/types'; // Ensure you have Policy interface
import { useRouter } from 'next/navigation';
import ThreePanelLayout from '@/app/components/atomic/templates/ThreePanelLayout';

const accountId = '12345'; // Replace this with the actual accountId from your context or state

export default function PoliciesPage() {
  const router = useRouter();
  const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]); // State for policies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the rules and policies from Elasticsearch based on the accountId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRules = await getRulesByAccountId(accountId);
        const fetchedPolicies = await getPoliciesByAccountId(accountId);
        setRules(fetchedRules);
        setPolicies(fetchedPolicies);
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter rules based on type
  const accessRules = rules.filter(
    (rule: Rule) => rule.ruleType === 'access'
  );
  const actionRules = rules.filter(
    (rule: Rule) => rule.ruleType === 'action'
  );
  const contentRules = rules.filter(
    (rule: Rule) => rule.ruleType === 'content'
  );

  const handleOpenCreateRuleModal = () => {
    setIsCreateRuleModalOpen(true);
    router.push('/assets/policies/create-rule?openModal=true');
  };

  const handleCloseCreateRuleModal = () => setIsCreateRuleModalOpen(false);

  // Define header props
  const header = {
    title: 'My Rules & Policies',
    description: 'Manage your account rules and policies across compliance frameworks.',
    actions: (
      <Button
        onClick={handleOpenCreateRuleModal}
      >
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        New Rule
      </Button>
    ),
  };

  // Define panels
  const leftPanel = (
    <TabsList className="flex flex-col space-y-2 p-4">
      <TabsTrigger value="policies">Policies</TabsTrigger>
      <TabsTrigger value="access_rules">Access Rules</TabsTrigger>
      <TabsTrigger value="action_rules">Action Rules</TabsTrigger>
      <TabsTrigger value="content_rules">Content Rules</TabsTrigger>
    </TabsList>
  );

  const centerPanel = (
    <TabsContent value="policies">
      <PolicyList policies={policies} />
    </TabsContent>
  );

  const rightPanel = (
    <div className="p-4">
      {/* Additional details or actions can go here */}
      {isCreateRuleModalOpen && (
        <Dialog
          open={isCreateRuleModalOpen}
          onOpenChange={setIsCreateRuleModalOpen}
        >
          <DialogOverlay
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleCloseCreateRuleModal}
          />
          <DialogContent
            className="fixed inset-0 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Create New Rule</h2>
                <button
                  onClick={handleCloseCreateRuleModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
              <AccessRightsForm />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  if (loading) return <p className="text-white">Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ThreePanelLayout
      header={header}
      leftPanel={
        <Tabs defaultValue="policies" orientation="vertical">
          {leftPanel}
        </Tabs>
      }
      centerPanel={
        <Tabs defaultValue="policies">
          {centerPanel}
          <TabsContent value="access_rules">
            <RulesList rules={accessRules} />
          </TabsContent>
          <TabsContent value="action_rules">
            <RulesList rules={actionRules} />
          </TabsContent>
          <TabsContent value="content_rules">
            <RulesList rules={contentRules} />
          </TabsContent>
        </Tabs>
      }
      rightPanel={rightPanel}
    />
  );
}
