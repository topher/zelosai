// lib/customSearchClient.ts

export function createCustomSearchClient(userId: string, orgId: string) {
    return {
      search: async (requests: any[]) => {
        try {
          const response = await fetch('/api/search/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requests }),
          });
  
          const result = await response.json();
          return result;
        } catch (error) {
          console.error('Error in custom search client:', error);
          return {
            results: requests.map(() => ({
              hits: [],
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
    };
  }
  