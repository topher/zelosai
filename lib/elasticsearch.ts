// lib/server/elasticsearch.ts

import axios, { AxiosInstance } from 'axios';
import logger from './logger'; // Assuming you have a logger setup

const ELASTICSEARCH_NODE = process.env.ELASTICSEARCH_NODE || 'http://localhost:9200';
const ELASTICSEARCH_USERNAME = process.env.ELASTICSEARCH_USERNAME || 'elastic';
const ELASTICSEARCH_PASSWORD = process.env.ELASTICSEARCH_PASSWORD || 'changeme';

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
    const response = await elasticsearch.post(`/${index}/_search`, body);
    const hits = response.data.hits.hits.map((hit: any) => ({
      ...hit._source,
      id: String(hit._source.id), // Ensure ID is a string
    }));
    logger.info(`Retrieved ${hits.length} resources from Elasticsearch.`);
    return hits;
  } catch (error: any) {
    logger.error(`Error searching index "${index}": ${error.response?.data || error.message}`);
    throw error;
  }
}

export default elasticsearch;
