import { countIndex } from "./elasticsearchAxios";

// lib/resource.ts
export function getResourceTypeFromPath(path: string): string | null {
  const parts = path.split('/');
  // Ensure that the path is at least 4 segments: ['', 'api', 'resource', 'topics']
  if (parts.length >= 4 && parts[1] === 'api' && parts[2] === 'resource') {
    return parts[3]; // This is the resourceName (e.g., 'topics')
  }
  return null;
}

export function getResourceIdFromPath(path: string): string | null {
  const parts = path.split('/');
  // Check if there's an ID present
  if (parts.length >= 5 && parts[1] === 'api' && parts[2] === 'resource') {
    return parts[4]; // '123' in /api/resource/topics/123
  }
  return null; // No ID in path
}

/**
 * Retrieves the count of a specific resource associated with a subscription.
 * Filters by orgId if present; otherwise, filters by ownerId.
 * @param resourceName - The name of the resource (e.g., 'goals', 'use_cases').
 * @param orgId - The ID of the organization. Can be an empty string for personal accounts.
 * @param userId - The ID of the user (owner). Used if orgId is empty.
 * @returns The count of the resource.
 */
export async function getResourceCount(
  resourceName: string,
  orgId: string,
  userId: string
): Promise<number> {
  let query;

  if (orgId && orgId.trim() !== '') {
    // Filter by orgId
    query = {
      term: { orgId },
    };
    console.log(`Filtering "${resourceName}" by orgId: ${orgId}`);
  } else {
    // Filter by ownerId
    query = {
      term: { ownerId: userId },
    };
    console.log(`Filtering "${resourceName}" by ownerId: ${userId}`);
  }

  try {
    const count = await countIndex(resourceName, query);
    console.log(`Resource "${resourceName}" count: ${count}`);
    return count;
  } catch (error) {
    console.log(
      `Failed to get resource count for "${resourceName}" with orgId "${orgId}" and ownerId "${userId}":`,
      error
    );
    return 0; // Default to 0 in case of error to prevent blocking actions
  }
}
