// lib/elasticsearchAxios.ts

import axios, { AxiosInstance } from 'axios';

const ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';
const ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME || 'elastic';
const ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD || 'changeme';

const elasticsearchAxios: AxiosInstance = axios.create({
  baseURL: ELASTICSEARCH_NODE,
  auth: {
    username: ELASTICSEARCH_USERNAME,
    password: ELASTICSEARCH_PASSWORD,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Searches an Elasticsearch index based on provided parameters.
 * @param index - The Elasticsearch index to search.
 * @param params - Search parameters including ids, query, limit, and from.
 * @returns An array of search results.
 */
export async function searchIndex(
  index: string,
  params: { ids?: string[]; query?: string; limit?: number; from?: number }
): Promise<any[]> {
  const { ids, query, limit = 10, from = 0 } = params;

  const esQuery: any = {
    bool: {
      must: [],
    },
  };

  if (ids && ids.length > 0) {
    const numericIds = ids.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    if (numericIds.length > 0) {
      esQuery.bool.must.push({
        terms: { id: numericIds },
      });
    }
  }

  if (query) {
    esQuery.bool.must.push({
      match_phrase_prefix: { name: query },
    });
  }

  const body = {
    query: esQuery,
    size: limit,
    from,
  };

  try {
    const response = await elasticsearchAxios.post(`/${index}/_search`, body);
    const hits = response.data.hits.hits.map((hit: any) => ({
      ...hit._source,
      id: String(hit._source.id), // Ensure ID is a string
    }));
    console.log(`Retrieved ${hits.length} resources from Elasticsearch index "${index}".`);
    return hits;
  } catch (error: any) {
    console.log(`Error searching index "${index}": ${error.response?.data || error.message}`);
    throw error;
  }
}

/**
 * Counts the number of documents in an Elasticsearch index based on a query.
 * @param index - The Elasticsearch index to count documents in.
 * @param query - The Elasticsearch query to filter documents.
 * @returns The count of matching documents.
 */
export async function countIndex(
  index: string,
  query: any
): Promise<number> {
  const body = {
    query,
  };

  try {
    const response = await elasticsearchAxios.post(`/${index}/_count`, body);
    const count = response.data.count;
    console.log(`Counted ${count} documents in Elasticsearch index "${index}".`);
    return count;
  } catch (error: any) {
    console.log(`Error counting documents in index "${index}": ${error.response?.data || error.message}`);
    throw error;
  }
}


export default elasticsearchAxios;
