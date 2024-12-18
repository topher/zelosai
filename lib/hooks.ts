// lib/hooks.ts

import { useEffect, useState } from 'react';
import { getSubscriptionTierForUser } from './user'; // Ensure this function is implemented and exported
import { SubscriptionTier } from '@/config/featuresConfig';

export function useSubscriptionTier(userId: string, orgId: string): SubscriptionTier {
    const [tier, setTier] = useState<SubscriptionTier>(SubscriptionTier.FREE);
  
    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;

      const fetchTier = async () => {
        try {
          const fetchedTier = await getSubscriptionTierForUser(userId, orgId);
          if (fetchedTier && Object.values(SubscriptionTier).includes(fetchedTier)) {
            setTier(fetchedTier);
          } else {
            console.warn('Fetched tier is invalid. Defaulting to FREE.');
            setTier(SubscriptionTier.FREE);
          }
        } catch (error) {
          if (!signal.aborted) {
            console.error('Error fetching subscription tier:', error);
            setTier(SubscriptionTier.FREE); // Fallback to FREE on error
          }
        }
      };
  
      fetchTier();

      return () => {
        controller.abort();
      };
    }, [userId, orgId]);
  
    return tier;
  }
