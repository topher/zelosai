// lib/logging.ts

import elasticsearch from './elasticsearch'; // Axios instance

interface UserActionLog {
  userId: string;
  action: string;
  resourceId?: string;
  resourceType: string;
  creditsUsed: number;
  timestamp: Date;
}

export async function logUserAction(log: UserActionLog): Promise<void> {
  try {
    await elasticsearch.post('/user-actions/_doc', log);
    console.log(`User action logged for user "${log.userId}".`);
  } catch (error: any) {
    console.error(`Error logging user action for user "${log.userId}":`, error.response?.data || error.message);
    throw error;
  }
}

export async function logUserPageVisit(log: { userId: string; page: string; timestamp: Date }): Promise<void> {
  try {
    await elasticsearch.post('/page-visits/_doc', log);
    console.log(`User page visit logged for user "${log.userId}" on page "${log.page}".`);
  } catch (error: any) {
    console.error(`Error logging page visit for user "${log.userId}" on page "${log.page}":`, error.response?.data || error.message);
    throw error;
  }
}
