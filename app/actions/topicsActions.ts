// topicActions.ts

import { Topic } from '@/app/types';
import { evaluateAccess } from '@/lib/policyEvaluation';

// Fetch topics from Elasticsearch
async function fetchTopicsFromElasticsearch(): Promise<Topic[]> {
  const response = await fetch('http://localhost:9200/topics/_search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: { match_all: {} }, // Adjust the query to match your needs
    }),
  });
  
  const data = await response.json();
  return data.hits.hits.map((hit: any) => hit._source);
}

// Fetch accessible topics for the given user and action
export async function getAccessibleTopics(userId: string, action: string): Promise<Topic[]> {
  const allTopics = await fetchTopicsFromElasticsearch(); // Replace this with your actual data fetching logic
  console.log('All topics fetched:', allTopics); // Make sure you're getting topics here

  // Filter topics where the user has access
  const accessibleTopics = [];

  for (const topic of allTopics) {
    const hasAccess = await evaluateAccess({
      userId,
      action,
      resourceId: resourceId, // Ensure this is the actual resource ID
      resourceType,
      userAttributes,
    });

    if (hasAccess) {
      accessibleTopics.push(topic);
    }
  }
  console.log("accessibleTopics",accessibleTopics)
  return accessibleTopics; // Return only the accessible topics
}
