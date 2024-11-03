// app/(dashboard)/upgrade/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { SubscriptionTier } from '@/config/featuresConfig';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn } = useUser(); // Use isLoaded and isSignedIn for better UX
  const router = useRouter();

  const handleUpgrade = async (tier: SubscriptionTier) => {
    setLoading(true);
    try {
      const response = await fetch('/api/subscriptions/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier }), // No need to pass userId or orgId
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to payment processor or confirmation page
        window.location.href = data.redirectUrl;
      } else {
        // Handle error
        const errorData = await response.json();
        console.error('Upgrade error:', errorData);
      }
    } catch (error) {
      console.error('Network error during upgrade:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Upgrade Your Subscription</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PRO Tier */}
        <Card>
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
            <CardDescription>$29/month</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Get access to advanced features and higher limits.</p>
            <Button
              onClick={() => handleUpgrade(SubscriptionTier.PRO)}
              disabled={loading}
              className="mt-4"
            >
              {loading ? 'Processing...' : 'Upgrade to Pro'}
            </Button>
          </CardContent>
        </Card>

        {/* ENTERPRISE Tier */}
        <Card>
          <CardHeader>
            <CardTitle>Enterprise Plan</CardTitle>
            <CardDescription>Contact us</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Customized solutions for large organizations.</p>
            <Button
              onClick={() => handleUpgrade(SubscriptionTier.ENTERPRISE)}
              disabled={loading}
              className="mt-4"
            >
              {loading ? 'Processing...' : 'Contact Sales'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
