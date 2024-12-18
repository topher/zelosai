import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const ELASTICSEARCH_URL = 'http://localhost:9200';
const MODELS_INDEX = 'complete_trained_models'; // Your Elasticsearch index name

// Fetch model from Elasticsearch by modelId
async function fetchModelById(modelId: string) {
  const query = {
    query: {
      match: { modelId } // Query based on the modelId
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
  } catch (error) {
    console.error(`Error fetching model by ID ${modelId}:`, error.message);
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: { modelId: string } }) {
  const { modelId } = params;

  // Fetch model from Elasticsearch
  const model = await fetchModelById(modelId);

  if (model) {
    return NextResponse.json(model, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Model not found' }, { status: 404 });
  }
}
