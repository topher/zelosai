// pages/api/perform-action.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server'; // Adjust based on your authentication provider
import { deductCreditsAndIncrementUsage } from '@/lib/credits'; // Your credit deduction and usage increment logic
import { FeatureKey } from '@/config/featuresConfig';
import { getUserById } from '@/lib/user'; // Your user fetching logic

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { userId, orgId } = getAuth(req);

    if (!userId || !orgId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { featureKey, action } = req.body;

    if (!featureKey || !action) {
      return res.status(400).json({ error: 'FeatureKey and action are required.' });
    }

    // Validate FeatureKey
    if (!Object.values(FeatureKey).includes(featureKey)) {
      return res.status(400).json({ error: 'Invalid FeatureKey.' });
    }

    // Validate Action
    const validActions = ['read', 'create', 'edit', 'delete'] as const;
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: 'Invalid action.' });
    }

    // Fetch user data
    const user = await getUserById(userId);
    if (!user || !user.subscription) {
      return res.status(404).json({ error: 'User or subscription not found.' });
    }

    const subscriptionId = user.subscription.subscriptionId;

    // Deduct credits and increment usage
    const deductionResult = await deductCreditsAndIncrementUsage({
      userId,
      action,
      featureKey,
      subscriptionId,
    });

    if (deductionResult.success) {
      return res.status(200).json({ success: true, creditsDeducted: deductionResult.creditsDeducted });
    } else {
      return res.status(403).json({ success: false, error: deductionResult.error });
    }
  } catch (error) {
    console.error('Error performing action:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
