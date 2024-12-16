// lib/customSearchClient.ts

import { SearchHit } from '@/app/types'; // Ensure this path is correct

interface SearchRequest {
  indexName: string;
  params: Record<string, string>;
}

interface InstantSearchResult {
  hits: SearchHit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMS: number;
  query: string;
  params: string;
}

interface SearchResponse {
  results: InstantSearchResult[];
}

interface SearchClient {
  search: (requests: SearchRequest[]) => Promise<SearchResponse>;
  searchForFacetValues?: (params: any) => Promise<any>;
}

export function createCustomSearchClient(userId: string, orgId: string): SearchClient {
  return {
    search: async (requests: SearchRequest[]) => {
      try {
        // Handle multiple requests if necessary; assuming one for simplicity
        const request = requests[0];
        const { indexName, params } = request;

        // Convert params to URLSearchParams
        const urlSearchParams = new URLSearchParams(params);

        // Ensure 'query' parameter is always present
        if (!urlSearchParams.has('query')) {
          urlSearchParams.set('query', '');
        }

        // Construct the API URL
        const url = `/api/resource/${indexName}?${urlSearchParams.toString()}`;

        console.log('CustomSearchClient - Fetching URL:', url);

        // Perform the fetch request
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('CustomSearchClient - Response Status:', response.status);

        // Parse the JSON response
        const result = await response.json();

        console.log('CustomSearchClient - Result:', result);

        // If the response already has 'results', return it directly
        if (result.results) {
          return result as SearchResponse;
        }

        // If the response has 'resources', transform it to 'results'
        if (result.resources) {
          // Map each resource to include 'objectID' and ensure 'resourceType' is present
          const hits: SearchHit[] = result.resources.map((resource: any) => ({
            ...resource,
            objectID: resource.id, // Map 'id' to 'objectID'
            // Ensure 'resourceType' exists; if not, use 'indexName' as default
            resourceType: resource.resourceType || indexName,
          }));

          // Construct the InstantSearchResult
          const instantSearchResult: InstantSearchResult = {
            hits,
            nbHits: hits.length,
            page: 0, // Default to first page
            nbPages: 1, // Assuming all hits fit in one page
            hitsPerPage: hits.length,
            processingTimeMS: 0, // Optional: measure actual processing time if needed
            query: urlSearchParams.get('query') || '',
            params: '', // Optional: include additional parameters if necessary
          };

          // Return the transformed response
          return {
            results: [instantSearchResult],
          } as SearchResponse;
        }

        // Fallback: return empty results if neither 'results' nor 'resources' are present
        return {
          results: requests.map(() => ({
            hits: [] as SearchHit[],
            nbHits: 0,
            page: 0,
            nbPages: 0,
            hitsPerPage: 15,
            processingTimeMS: 0,
            query: '',
            params: '',
          })),
        };
      } catch (error) {
        console.error('Error in custom search client:', error);

        // On error, return empty results for each request
        return {
          results: requests.map(() => ({
            hits: [] as SearchHit[],
            nbHits: 0,
            page: 0,
            nbPages: 0,
            hitsPerPage: 15,
            processingTimeMS: 0,
            query: '',
            params: '',
          })),
        };
      }
    },
    // Optional: Implement 'searchForFacetValues' if needed
  };
}
