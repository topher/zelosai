// pages/settings/usage/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { SummaryCard } from './components/SummaryCard'; // Adjust the import path as needed
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ThumbsUp, CreditCard, Activity } from 'lucide-react';
import { getCreditsUsage } from '@/lib/credits'; // Implement this based on your backend
import { UserAction, Subscription, FeaturesUsage  } from '@/app/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FeatureUsageCard } from './components/FeaturesUsageCard';
import { useAuth } from '@clerk/nextjs';
import { features as allFeatures, FeatureKey, SubscriptionTier, Feature } from '@/config/featuresConfig'; // Ensure correct import
import { Loader } from '@/components/loader'; // Implement a Spinner component

const UsagePage: React.FC = () => {
  // State variables to manage fetched data
  const [totalActions, setTotalActions] = useState<number>(0);
  const [creditsUsed, setCreditsUsed] = useState<number>(0);
  const [remainingCredits, setRemainingCredits] = useState<number>(0);
  const [recentActivities, setRecentActivities] = useState<UserAction[]>([]);
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>(SubscriptionTier.FREE);
  const [subscriptionId, setSubscriptionId] = useState<string>(''); // State for subscriptionId
  const [featuresUsage, setFeaturesUsage] = useState<FeaturesUsage>({});
  const [resourceCounts, setResourceCounts] = useState<{ [key in FeatureKey]?: number }>({});
  const [error, setError] = useState<string>(''); // State for error messages
  const [isLoading, setIsLoading] = useState<boolean>(true); // Combined loading state

  const { userId } = useAuth(); // Get the current user's ID

  // Fetch subscription details and user actions
  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        setError('User not authenticated.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Fetch subscription details
        const subscriptionResponse = await fetch(`/api/subscriptions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!subscriptionResponse.ok) {
          throw new Error('Failed to fetch subscription details.');
        }

        const subscriptionData = await subscriptionResponse.json();
        const subscription: Subscription = subscriptionData.subscription;

        setSubscriptionTier(subscription.subscriptionTier);
        setCreditsUsed(subscription.creditsUsed);
        setRemainingCredits(subscription.monthlyCreditLimit - subscription.creditsUsed);
        setSubscriptionId(subscription.subscriptionId);
        setFeaturesUsage(subscription.featuresUsage || {});
        setResourceCounts(subscription.resourceCounts || {});

        // Fetch user actions
        const actionsResponse = await fetch(`/api/resource/user_actions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!actionsResponse.ok) {
          throw new Error('Failed to fetch user actions.');
        }

        const actionsData = await actionsResponse.json();
        const actions: UserAction[] = actionsData.resources;

        setTotalActions(actions.length);

        // Sort actions by creation date in descending order and set recent activities
        const sortedActions = actions.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentActivities(sortedActions.slice(0, 5)); // Show last 5 actions
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader /> {/* Implement a Spinner component */}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Actions"
          value={totalActions}
          icon={ThumbsUp}
          colorClass="bg-blue-500"
        />
        <SummaryCard
          title="Credits Used"
          value={creditsUsed}
          icon={CreditCard}
          colorClass="bg-green-500"
          description={`Remaining: ${remainingCredits}`}
        />
        <SummaryCard
          title="Recent Activities"
          value={recentActivities.length}
          icon={Activity}
          colorClass="bg-purple-500"
        />
      </div>

      {/* Usage Details Table */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Usage Details</CardTitle>
            <CardDescription>Your recent actions and credit usage.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Feature</TableHead>
                  <TableHead>Resource ID</TableHead>
                  <TableHead>Credits Used</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((action: UserAction) => (
                  <TableRow key={action.id}>
                    <TableCell>{action.action}</TableCell>
                    <TableCell>{action.feature}</TableCell>
                    <TableCell>{action.resourceId || 'N/A'}</TableCell>
                    <TableCell>{action.creditsUsed}</TableCell>
                    <TableCell>{new Date(action.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
            {/* Feature Usage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {allFeatures.map((feature: Feature) => {
          // Extract the first action's usage as a representative (you may need to adjust based on your logic)
          const representativeAction = feature.actions.find((a) => a.action === 'create');
          const representativeActionKey = representativeAction?.actionKey;
          const usage = representativeAction ? featuresUsage[representativeActionKey] || { creditsUsed: 0 } : { creditsUsed: 0 };
          const max = representativeAction.resourceLimits
            ? representativeAction.resourceLimits[getTierIndex(subscriptionTier)]
            : 'unlimited';

          const usedCredits = usage.creditsUsed;
          const resourceCount = resourceCounts[feature.key] || 0;
          const resourceLimit = representativeAction.resourceLimits
            ? representativeAction.resourceLimits[getTierIndex(subscriptionTier)]
            : 'unlimited';

          return (
            <FeatureUsageCard
              key={feature.key}
              featureKey={feature.key}
              used={usedCredits}
              max={max}
              resourceCount={resourceCount}
              resourceLimit={resourceLimit}
            />
          );
        })}
      </div>
    </div>
  );
};

// Helper function to get tier index
const getTierIndex = (tier: SubscriptionTier): number => {
  switch (tier) {
    case SubscriptionTier.FREE:
      return 0;
    case SubscriptionTier.PRO:
      return 1;
    case SubscriptionTier.ENTERPRISE:
      return 2;
    default:
      return 0;
  }
};

export default UsagePage;
