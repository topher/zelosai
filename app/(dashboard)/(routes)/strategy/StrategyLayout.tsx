import React from 'react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface StrategyLayoutProps {
  children: React.ReactNode;
}

const StrategyLayout: React.FC<StrategyLayoutProps> = ({ children }) => {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    router.push(`/strategy/${value}`);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header Section */}
      <div>
        <h3 className="text-xl font-medium">Strategy Dashboard</h3>
        <p className="text-sm text-muted-foreground">
          Explore and configure your business model components.
        </p>
      </div>
      <Separator />

      {/* Tab Navigation */}
      <Tabs defaultValue="plan" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="plan">Plan</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="agents">User Personas</TabsTrigger>
          <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value="plan">{children}</TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategyLayout;
