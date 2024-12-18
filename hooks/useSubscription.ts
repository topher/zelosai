// hooks/useSubscription.ts

import { useState, useEffect } from 'react';
import { Subscription } from '@/app/types';
import { getSubscription } from '@/lib/subscription'; // Ensure this function is exported
import { useAuth } from '@clerk/nextjs'; // Assuming you're using Clerk for authentication

export function useSubscription() {
  const { userId, orgId } = useAuth(); // Adjust based on your auth implementation
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubscription() {
      setLoading(true);
      setError(null);
      try {
        if (userId) {
          console.error('🐙sss', orgId, userId);
          const sub = await getSubscription(orgId, userId);
          setSubscription(sub);
        } else {
          setSubscription(null);
        }
      } catch (err: any) {
        console.error('Error fetching subscription:', err);
        setError('Failed to fetch subscription.');
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [userId, orgId]);

  return { subscription, loading, error };
}

