import { Resource } from "@/app/types";
import { countIndex } from "./elasticsearchAxios";

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

// utils/resourceUtils.ts

export const linkResources = (
  resource: Resource,
  targetResourceId: string,
  targetResourceType: string
) => {
  if (!resource.linkedResources) {
    resource.linkedResources = {};
  }
  if (!resource.linkedResources[targetResourceType]) {
    resource.linkedResources[targetResourceType] = [];
  }
  resource.linkedResources[targetResourceType].push(targetResourceId);
};

export const unlinkResources = (
  resource: Resource,
  targetResourceId: string,
  targetResourceType: string
) => {
  if (
    resource.linkedResources &&
    resource.linkedResources[targetResourceType]
  ) {
    resource.linkedResources[targetResourceType] = resource.linkedResources[
      targetResourceType
    ].filter((id) => id !== targetResourceId);
  }
};

export const fetchResourcesByType = async (
  inputValue: string,
  resourceTypes: string[]
) => {
  const results = [];

  for (const resourceType of resourceTypes) {
    try {
      const response = await fetch(
        `/api/resource/${resourceType}?search=${encodeURIComponent(inputValue)}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.ok) {
        const data = await response.json();
        results.push(...data);
      } else {
        console.error(`Failed to fetch resources for ${resourceType}`);
      }
    } catch (error) {
      console.error(`Error fetching resources for ${resourceType}:`, error);
    }
  }

  return results;
};
