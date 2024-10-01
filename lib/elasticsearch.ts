// /lib/elasticsearch.ts

import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';
const ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME || 'elastic';
const ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD || 'changeme';

// Create an Axios instance configured for Elasticsearch
const elasticsearch: AxiosInstance = axios.create({
  baseURL: ELASTICSEARCH_NODE,
  auth: {
    username: ELASTICSEARCH_USERNAME,
    password: ELASTICSEARCH_PASSWORD,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ensure index exists with appropriate mappings
export const ensureIndexExists = async (index: string, mappings: object) => {
  try {
    // Check if the index exists
    await elasticsearch.head(`/${index}`);
    // If no error, index exists
    console.log(`Index "${index}" already exists.`);
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // Index does not exist, create it
      await elasticsearch.put(`/${index}`, {
        mappings,
      });
      console.log(`Index "${index}" created successfully.`);
    } else {
      // Re-throw other errors
      console.error(`Error checking/creating index "${index}":`, error.message);
      throw error;
    }
  }
};

/**
 * Searches an Elasticsearch index based on provided parameters.
 * @param index - Name of the Elasticsearch index.
 * @param params - Search parameters including ids, query, limit, and from.
 * @returns Array of matched documents.
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
    // Assuming 'id' is stored as integer in Elasticsearch
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
    from, // Pagination offset
  };

  try {
    const response = await elasticsearch.post(`/${index}/_search`, body);
    const hits = response.data.hits.hits.map((hit: any) => ({
      ...hit._source,
      id: String(hit._source.id), // Ensure ID is a string
    }));
    return hits;
  } catch (error: any) {
    console.error(`Error searching index "${index}":`, error.response?.data || error.message);
    throw error;
  }
}

export default elasticsearch;
