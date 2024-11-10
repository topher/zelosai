// lib/dataFetching.ts

import elasticsearchAxios from './elasticsearchAxios';
import { buildAccessControlledQuery } from './accessControl';
import { integer } from '@elastic/elasticsearch/lib/api/types'; // Retain if used elsewhere
import { SubscriptionTier, TIER_ORDER } from '@/config/featuresConfig';
import { Message } from '@/app/types';

// Remove the Client import as it's no longer needed

/**
 * Get a specific resource by ID
 */
export async function getResourceById(resourceName: string, resourceId: string): Promise<any | null> {
  const endpoint = `/${resourceName.toLowerCase()}/_doc/${resourceId}`;
  console.log(`🔍 Fetching resource from Elasticsearch: GET ${endpoint}`);

  try {
    const response = await elasticsearchAxios.get(endpoint);

    if (!response.data || !response.data._source) {
      console.error(`❌ Resource ${resourceId} not found in ${resourceName}`);
      return null;
    }

    return response.data._source; // Return the resource data
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.error(`❌ Resource ${resourceId} not found in ${resourceName}`);
      return null;
    }
    console.error(`❌ Error fetching resource ${resourceId} in ${resourceName}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Create a new resource
 */
export async function createResource(resourceName: string, resourceData: any): Promise<any> {
  try {
    const response = await elasticsearchAxios.post(`/${resourceName.toLowerCase()}/_doc`, resourceData);

    // Optionally, return the created resource with its ID
    return {
      id: response.data._id,
      ...resourceData,
    };
  } catch (error: any) {
    console.error(`❌ Error creating resource in ${resourceName}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Update an existing resource by ID
 */
export async function updateResource(resourceName: string, resourceId: string, updatedData: any): Promise<any> {
  try {
    // Update the document in Elasticsearch
    await elasticsearchAxios.post(`/${resourceName.toLowerCase()}/_update/${resourceId}`, {
      doc: updatedData, // Update only the changed fields
    });

    // Retrieve and return the updated resource
    const updatedResource = await getResourceById(resourceName, resourceId);
    return updatedResource;
  } catch (error: any) {
    console.error(`❌ Error updating resource ${resourceId} in ${resourceName}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Delete a resource by ID
 */
export async function deleteResource(resourceName: string, resourceId: string): Promise<any> {
  try {
    const response = await elasticsearchAxios.delete(`/${resourceName.toLowerCase()}/_doc/${resourceId}`);

    return response.data; // Return the deletion result
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.error(`❌ Resource ${resourceId} not found in ${resourceName}`);
      return { result: 'not_found' };
    }
    console.error(`❌ Error deleting resource ${resourceId} from ${resourceName}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get the count of resources a user has for a specific resourceName.
 * @param resourceName - The name of the resource (e.g., 'goals')
 * @param subscriptionId - The subscription ID of the user
 * @returns The count of resources
 */
export async function getResourceCount(resourceName: string, subscriptionId: string): Promise<number> {
  try {
    const response = await elasticsearchAxios.post(`/${resourceName.toLowerCase()}/_count`, {
      query: {
        term: { subscriptionId }, // Ensure each resource document has a 'subscriptionId' field
      },
    });

    return response.data.count || 0;
  } catch (error: any) {
    console.error(`❌ Error fetching resource count for ${resourceName}:`, error.response?.data || error.message);
    return 0;
  }
}

/**
 * Map resource names to types
 */
function mapResourceNameToType(resourceName: string): string | null {
  const resourceTypeMap: { [key: string]: string } = {
    recommendations: 'Recommendation',
    goals: 'Goal',
    use_cases: 'UseCase',
    agents: 'Agent',
    issues: 'StrategicIssue',
    business_model_cards: 'BusinessModelCard',
    brand_model_cards: 'BrandModelCard',
    complete_trained_models: 'AIModel',
    user_defined_model_categories: 'UserDefinedModelCategory',
    model_subjects: 'ModelSubject',
    model_trainings: 'ModelTraining',
    personas: 'Persona',
    connectors: 'DataConnector',
    topics: 'Topic',
    info_assets: 'InfoAsset',
    policies: 'Policy',
    data_categories: 'DataCategory',
    messages: 'Message',
    offers: 'Offer',
    requests: 'Request',
    contacts: 'Contact',
    contracts: 'Contract',
    workflows: 'Workflow',
    athletes_triples: 'ProfileAthlete',
    profile_contracts: 'ProfileContract',
    profile_models: 'ProfileModel',
    profile_brands: 'ProfileBrand',
    profile_users: 'ProfileUser',
    searchable_athletes: 'SearchableAthlete',
    searchable_contracts: 'SearchableContract',
    searchable_models: 'SearchableModel',
    searchable_brands: 'SearchableBrand',
    searchable_users: 'SearchableUser',
    tasks: 'Task',
    scheduled_events: 'ScheduledEvent',
    transactions: 'Transaction',
    user_actions: 'UserAction',

    // New mappings
    alerts: 'Alert',
    statistics: 'Statistic',
  };

  return resourceTypeMap[resourceName.toLowerCase()] || null;
}

/**
 * Get accessible resources for a user based on access control
 */
// lib/dataFetching.ts

export async function getAccessibleResources({
  userId,
  action,
  resourceName,
  query = '',
  size = 100,
  from = 0,
  userAttributes,
}: {
  userId: string;
  action: string;
  resourceName: string;
  query?: string;
  size?: number;
  from?: number;
  userAttributes: any;
}): Promise<Message[]> { // Replace 'Message' with your actual type
  const resourceType = mapResourceNameToType(resourceName);
  if (!resourceType) {
    throw new Error(`Unknown resource name: ${resourceName}`);
  }

  // Build the access-controlled query, possibly incorporating 'query'
  const constructedQuery = await buildAccessControlledQuery(userAttributes, action, resourceType);

  try {
    const response = await elasticsearchAxios.post(`/${resourceName.toLowerCase()}/_search`, {
      query: constructedQuery,
      size,
      from, // Include 'from' for pagination
    });

    if (!response.data || !response.data.hits) {
      console.error(`❌ No hits found for resources of type ${resourceType}`);
      return [];
    }

    return response.data.hits.hits.map((hit: any) => hit._source) || [];
  } catch (error: any) {
    console.error(`❌ Failed to fetch resources of type ${resourceType} from Elasticsearch:`, error.response?.data || error.message);
    return [];
  }
}
