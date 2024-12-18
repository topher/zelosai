import { Resource } from "@/app/types";
import { countIndex } from "./elasticsearchAxios";
import elasticsearchAxios from './elasticsearchAxios';

import { buildAccessControlledQuery } from './accessControl';
import { integer } from '@elastic/elasticsearch/lib/api/types'; // Retain if used elsewhere
import { SubscriptionTier, TIER_ORDER } from '@/config/featuresConfig';
import { Message } from '@/app/types';
import { generateSubjectId } from "./subjectIdGenerator";
import { ResourceType } from "@/config/resourceTypes";

/**
/**
 * Create a new resource with a predefined _id matching the provided id.
 * @param resourceName - The name of the Elasticsearch index.
 * @param resourceData - The data of the resource to index.
 * @param id - The UUID to set as both the document's _id and id field.
 * @returns The created resource with its id.
 */
export async function createResource(
  resourceName: string,
  resourceData: any,
  id: string
): Promise<any> {
  try {
    if (!id) {
      throw new Error('Resource ID is undefined.');
    }

    // Ensure the document includes the 'id' field matching the _id
    const document = {
      id, // Align the document's id with the _id
      ...resourceData,
    };

    // Index the document using PUT to set _id to the provided id
    const response = await elasticsearchAxios.put(
      `/${resourceName.toLowerCase()}/_doc/${id}`,
      document
    );

    console.log(`✅ Resource created with ID: ${response.data._id}`);

    // Return the created resource with its ID
    return {
      id: response.data._id,
      ...document,
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
 * Fetches triples from Elasticsearch based on the subject ID.
 *
 * @param resourceType - The type of resource (e.g., ProfileAthlete, userProfile).
 * @param resourceId - The unique identifier of the resource.
 * @returns A promise that resolves to an array of triples.
 */
export async function getTriplesBySubjectId(resourceType: string, resourceId: string): Promise<any[]> {
  try {
    // Generate the full subject URI based on the resource type and ID
    let subjectIdFull: string;

    if (resourceType === "ProfileAthlete") {
      subjectIdFull = generateSubjectId(resourceType, resourceId);
    } else {
      subjectIdFull = resourceId;
    }

    console.log(`🔍 getTriplesBySubjectId for Subject ID: ${resourceType} ${resourceId}`);

    // Perform the Elasticsearch query
    const response = await elasticsearchAxios.post('/triples/_search', {
      query: {
        term: {
          'subject.keyword': subjectIdFull,
        },
      },
      size: 1000, // Adjust size as needed
    });

    // Check if any triples were found
    if (!response.data || !response.data.hits || response.data.hits.total.value === 0) {
      console.warn(`⚠️  No triples found for subjectId: ${subjectIdFull}`);
      return [];
    }

    // Return the list of triples
    return response.data.hits.hits.map((hit: any) => hit._source) || [];
  } catch (error: any) {
    console.error(`❌ Error fetching triples for subjectId ${resourceId}:`, error.response?.data || error.message);
    throw error;
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
    users_triples: 'ProfileUser',
    searchable_athletes: 'SearchableAthlete',
    searchable_contracts: 'SearchableContract',
    searchable_models: 'SearchableModel',
    searchable_brands: 'SearchableBrand',
    searchable_users: 'SearchableUser',
    tasks: 'Task',
    scheduled_events: 'ScheduledEvent',
    transactions: 'Transaction',
    user_actions: 'UserAction',
    triples: 'Triple',

    // New mappings
    alerts: 'Alert',
    statistics: 'Statistic',
  };

  return resourceTypeMap[resourceName.toLowerCase()] || null;
}

/**
 * Get accessible resources for a user based on access control
 */

export async function getAccessibleResources({
  userId,
  action,
  resourceName,
  query = '',
  size = 100,
  from = 0,
  userAttributes,
  filters = {},
}: {
  userId: string;
  action: string;
  resourceName: string;
  query?: string;
  size?: number;
  from?: number;
  userAttributes: any;
  filters?: { [key: string]: any };
}): Promise<any[]> {
  const resourceType = mapResourceNameToType(resourceName);
  if (!resourceType) {
    throw new Error(`Unknown resource name: ${resourceName}`);
  }

  // Get the access-controlled query
  const accessControlledQuery = await buildAccessControlledQuery(userAttributes, action, resourceType);

  // Ensure 'accessControlledQuery' is a 'bool' query
  if (!accessControlledQuery.bool) {
    throw new Error('Access controlled query is not a bool query');
  }

  // Prepare filter queries
  const filterQueries = Object.entries(filters).map(([field, value]) => ({
    term: { [field]: value },
  }));

  // Combine 'must' clauses
  const combinedMust = [
    ...(accessControlledQuery.bool.must || []),
    ...filterQueries,
  ];

  // Build the final query
  const finalQuery = {
    bool: {
      ...accessControlledQuery.bool,
      must: combinedMust,
    },
  };

  try {
    console.log("🏁 Final constructed query:", JSON.stringify(finalQuery, null, 2));

    const response = await elasticsearchAxios.post(
      `/${resourceName.toLowerCase()}/_search`,
      {
        query: finalQuery,
        size,
        from,
      }
    );

    if (!response.data || !response.data.hits) {
      console.error(`❌ No hits found for resources of type ${resourceType}`);
      return [];
    }

    return response.data.hits.hits.map((hit: any) => hit._source) || [];
  } catch (error: any) {
    console.error(
      `❌ Failed to fetch resources of type ${resourceType} from Elasticsearch:`,
      error.response?.data || error.message
    );
    return [];
  }
}

