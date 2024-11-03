// lib/webhookUtils.ts

import elasticsearchAxios from './elasticsearchAxios';

/**
 * Checks if a webhook event has already been processed.
 * @param svixId - The unique ID of the webhook event.
 * @returns Boolean indicating if the event has been processed.
 */
export async function isWebhookProcessed(svixId: string): Promise<boolean> {
  const endpoint = `/webhook_events/_doc/${svixId}`;
  try {
    const response = await elasticsearchAxios.get(endpoint);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false; // Not processed
    }
    console.error(`Error checking webhook event "${svixId}":`, error);
    throw error; // Other errors
  }
}

/**
 * Marks a webhook event as processed by creating a record in Elasticsearch.
 * @param svixId - The unique ID of the webhook event.
 */
export async function markWebhookAsProcessed(svixId: string): Promise<void> {
  const endpoint = `/webhook_events/_doc/${svixId}`;
  try {
    await elasticsearchAxios.put(endpoint, {
      processedAt: new Date().toISOString(),
    });
    console.log(`Marked webhook event "${svixId}" as processed.`);
  } catch (error: any) {
    console.error(`Error marking webhook event "${svixId}" as processed:`, error);
    throw error;
  }
}
