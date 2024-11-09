// app/(dashboard)/(routes)/dashboard/recommendations/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useUser, useOrganization } from "@clerk/nextjs";
import { Recommendation, Subscription } from "@/app/types";
import { useRouter } from "next/navigation";
import { SubscriptionTier } from "@/config/featuresConfig";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { Button } from "@/components/ui/button";
import ActionResourceRecommendationCard from "./components/ActionResourceRecommendationCard";
import HomeDashboardLayout from "@/app/components/atomic/templates/HomeDashboardLayout";

const RecommendationsPage: React.FC = () => {
  const { user } = useUser();
  const { organization } = useOrganization();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const router = useRouter();

  // Default subscription
  const defaultSubscription: Subscription = {
    subscriptionId: '',
    subscriptionTier: SubscriptionTier.FREE,
    userId: '',
    creditsUsed: 0,
    monthlyCreditLimit: 100,
    featuresUsage: {},
    resourceCounts: {},
    createdAt: undefined,
    updatedAt: undefined,
    organizationId: "",
    credits: 0
  };

  useEffect(() => {
    // Fetch subscription data
    const fetchUserSubscription = async () => {
      try {
        const response = await fetch('/api/subscriptions', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          const subscriptionData: Subscription = data.subscription;
          setSubscription(subscriptionData);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch subscription:', errorData.error);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setSubscriptionLoading(false);
      }
    };

    if (organization) {
      fetchUserSubscription();
    } else {
      console.log('No organization found.');
      setSubscriptionLoading(false);
    }
  }, [organization?.id]);

  // Fetch recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch("/api/resource/recommendations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecommendations(data.resources);
        } else {
          setError("Failed to load recommendations.");
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setError("Failed to load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const { isFeatureAllowed, performAction } = useFeatureAccess(subscription || defaultSubscription);

  // Action Handlers
  const handleDo = async (id: string) => {
    // Implement handleDo logic
  };

  const handleArchive = async (id: string) => {
    // Implement handleArchive logic
  };

  const handleLike = async (id: string) => {
    // Implement handleLike logic
  };

  const handleComment = async (id: string) => {
    // Implement handleComment logic
  };

  const isLoading = loading || subscriptionLoading;

  return (
    <HomeDashboardLayout
      header={{
        title: "Your Recommendations",
        description: "Get personalized suggestions to enhance your experience.",
        actions: (
          <Button onClick={() => router.push("/dashboard/features")}>
            Explore Features
          </Button>
        ),
      }}
      isLoading={isLoading}
      error={error}
      items={recommendations}
      renderItem={(rec) => (
        <ActionResourceRecommendationCard
          key={rec.id}
          recommendation={rec}
          onDo={handleDo}
          onArchive={handleArchive}
          onLike={handleLike}
          onComment={handleComment}
        />
      )}
    />
  );
};

export default RecommendationsPage;
