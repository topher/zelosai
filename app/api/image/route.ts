// app/api/image/[id]/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

// Define your Elasticsearch configuration
const ELASTICSEARCH_URL = 'http://localhost:9200'; // Update if different
const MODELS_INDEX = 'complete_trained_models'; // Your Elasticsearch index name

// Fetch model from Elasticsearch by modelId
async function fetchModelById(modelId: string) {
  const query = {
    query: {
      match: { modelId } // Ensure 'modelId' matches the field in your Elasticsearch index
    }
  };

  try {
    const response = await axios.post(`${ELASTICSEARCH_URL}/${MODELS_INDEX}/_search`, query);

    if (response.data.hits.hits.length > 0) {
      // Return the first matching model
      return response.data.hits.hits[0]._source;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error(`Error fetching model by ID ${modelId}:`, error.message);
    return null;
  }
}
