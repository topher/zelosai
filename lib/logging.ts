// lib/logging.ts

import { FeatureKey, Action, ActionFeatureKey } from '@/config/featuresConfig';
import { toast } from 'react-hot-toast';
import elasticsearchAxios from './elasticsearchAxios';
import { UserAction } from '@/app/types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for Log User Action Parameters
 */
interface LogUserActionParams {
  subjectId: string;
  orgId: string;
  action: Action;
  actionFeatureKey: ActionFeatureKey;
  resourceId: string;
  creditsUsed: number;
  createdAt: Date;
  isSystemAction?: boolean; // Flag to identify system actions
}

/**
 * Log User Action Function
 */
export async function logUserAction(params: LogUserActionParams): Promise<void> {
  const { subjectId, orgId, action, actionFeatureKey, resourceId, creditsUsed, createdAt, isSystemAction } = params;

  // Prevent logging if the action is on the 'user_actions' resource and not a system action
  if (!isSystemAction && actionFeatureKey === ActionFeatureKey.ReadUserAction) {
    console.log("Logging of 'user_actions' actions is skipped to prevent recursion.");
    return;
  }

  const userAction: UserAction = {
    id: uuidv4(),
    subjectId,
    action,
    actionFeatureKey,
    resourceId,
    creditsUsed,
    createdAt,
    resourceType: 'UserAction',
    accountId: orgId,
    ownerId: subjectId
  };

  try {
    // Save `userAction` to Elasticsearch
    await elasticsearchAxios.post('/user_actions/_doc', userAction);
    console.log("User action logged successfully:", userAction);
  } catch (error) {
    console.error("Failed to log user action:", error);
    toast.error('Failed to log your action.');
  }
}
