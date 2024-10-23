// app/(dashboard)/(routes)/rules/page.tsx

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
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

const accountId = '12345'; // Replace this with the actual accountId from your context or state

export default function RulesLayout() {
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
    router.push('/knowledge-bank/rules/create-rule?openModal=true');
  };

  const handleCloseCreateRuleModal = () =>
    setIsCreateRuleModalOpen(false);

  if (loading) return <p>Loading data...</p>;
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
      <div className="hidden md:block bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">
                My Rules & Policies
              </h1>
              <p className="text-lg text-gray-600">
                Manage your account rules and policies across compliance frameworks.
              </p>
            </div>
            <Button
              onClick={handleOpenCreateRuleModal}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <PlusCircledIcon className="mr-2 h-5 w-5" />
              New Rule
            </Button>
          </div>
          <Tabs defaultValue="access_rules">
            <TabsList className="border-b mb-6">
              <TabsTrigger
                value="access_rules"
                className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900"
              >
                Access Rules
              </TabsTrigger>
              <TabsTrigger
                value="action_rules"
                className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900"
              >
                Action Rules
              </TabsTrigger>
              <TabsTrigger
                value="content_rules"
                className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900"
              >
                Content Rules
              </TabsTrigger>
              <TabsTrigger
                value="policies"
                className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900"
              >
                Policies
              </TabsTrigger>
            </TabsList>
            <TabsContent value="access_rules">
              <RulesList rules={accessRules} />
            </TabsContent>
            <TabsContent value="action_rules">
              <RulesList rules={actionRules} />
            </TabsContent>
            <TabsContent value="content_rules">
              <RulesList rules={contentRules} />
            </TabsContent>
            <TabsContent value="policies">
              <PolicyList policies={policies} />
            </TabsContent>
          </Tabs>
        </div>
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
                  <h2 className="text-2xl font-semibold">
                    Create New Rule
                  </h2>
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
    </>
  );
}
