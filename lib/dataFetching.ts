// lib/dataFetching.ts
import { getUserAttributes } from './auth';
import { buildAccessControlledQuery } from './accessControl';
import { integer } from '@elastic/elasticsearch/lib/api/types';

export async function getAccessibleResources({
  userId,
  action,
  resourceName,
  size,
  // testUserAttributes, // Uncomment if you want to pass test user attributes
}: {
  userId: string;
  action: string;
  resourceName: string;
  size: integer;
  // testUserAttributes?: Record<string, any>;
}): Promise<any[]> {
  console.log(`🚀 Fetching resources for: ${resourceName}`);
  const resourceType = mapResourceNameToType(resourceName);
  if (!resourceType) {
    throw new Error(`Unknown resource name: ${resourceName}`);
  }

  // Retrieve user attributes, pass testUserAttributes if needed
  // Uncomment the following line if you want to use testUserAttributes
  // const userAttributes = await getUserAttributes(testUserAttributes);

  // Use actual user attributes
  const userAttributes = await getUserAttributes();
  
  const query = await buildAccessControlledQuery(userAttributes, action, resourceType);

  // Optional: Ensure that the query includes resourceType and orgId as exact matches
  // This depends on how buildAccessControlledQuery is implemented
  // Avoid adding redundant conditions

  console.log("🔍 Elasticsearch Query:", JSON.stringify(query, null, 2));

  // Ensure resourceName correctly maps to the Elasticsearch index
  const indexName = resourceName.toLowerCase(); // e.g., 'goals'

  const response = await fetch(`http://localhost:9200/${indexName}/_search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add authentication headers if Elasticsearch is secured
    },
    body: JSON.stringify({
      query,
      size,
    }),
  });

  console.log("📥 Response Status:", response.status);

  if (!response.ok) {
    const errorResponse = await response.text();
    console.error(`❌ Failed to fetch resources of type ${resourceType} from Elasticsearch:`, errorResponse);
    return [];
  }

  const data = await response.json();
  console.log(`✅ Retrieved ${data.hits.hits.length} resources.`);
  return data.hits?.hits?.map((hit: any) => hit._source) || [];
}

function mapResourceNameToType(resourceName: string): string | null {
  const resourceTypeMap: { [key: string]: string } = {
    topics: 'Topic',
    contracts: 'ContractModel',
    user_defined_model_categories: 'UserDefinedModelCategory',
    complete_trained_models: 'AIModel',
    connectors: 'DataConnector',
    info_assets: 'InfoAsset',
    workflows: 'Workflow',
    goals: 'Goal',
    issues: 'StrategicIssue',
    use_cases: 'UseCase',
    agents: 'Agent',
    contacts: 'Contact',
    business_model_cards: 'BusinessModelCard',
    business_model: 'BusinessModel',
    user_selected_facets: 'UserSelectedFacets',
    brand_model_cards: 'BrandModelCard',
  };

  return resourceTypeMap[resourceName.toLowerCase()] || null;
}
