// app/(dashboard)/(routes)/dashboard/recommendations/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useUser, useOrganization } from "@clerk/nextjs";
import { Recommendation, Subscription } from "@/app/types";
import { useRouter } from "next/navigation";
import { features, FeatureKey, SubscriptionTier, ActionFeatureKey } from "@/config/featuresConfig";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import ActionResourceRecommendationCard from "./components/ActionResourceRecommendationCard";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

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
    creditsUsed: 0,
    monthlyCreditLimit: 100,
    featuresUsage: {},
    resourceCounts: {},
    createdAt: undefined,
    updatedAt: undefined,
    organizationId: "",
    userId: "",
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
          setRecommendations(data.resources); // Ensure 'resources' includes 'description' and 'featureKey'
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

  const { isFeatureAllowed, performAction } = useFeatureAccess();

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

  if (loading || subscriptionLoading) return <p>Loading recommendations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-gradient-to-b p-8 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight ${montserrat.className}`}>
              Your Recommendations
            </h2>
            <p className="text-muted-foreground">
              Get personalized suggestions to enhance your experience.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => router.push("/dashboard/features")}>
              Explore Features
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Recommendations with Gradient Background */}
      <div className="flex-1 overflow-y-auto" style={{ background: 'linear-gradient(to bottom, #0A0E27, #000000)' }}>
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <ActionResourceRecommendationCard
                key={rec.id}
                recommendation={rec}
                onDo={handleDo}
                onArchive={handleArchive}
                onLike={handleLike}
                onComment={handleComment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
