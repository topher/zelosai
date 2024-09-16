import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AIModel } from '@/app/types'; // Assuming this is the correct path for AIModel type

const ELASTICSEARCH_URL = 'http://localhost:9200/';
const MODELS_INDEX = 'complete_trained_models'; // Ensure this matches your Elasticsearch index name

// Fetch model from Elasticsearch by modelId
async function fetchModelById(modelId: string): Promise<AIModel | null> {
  try {
    const query = {
      query: {
        match: { modelId }
      }
    };

    // Perform the Elasticsearch query
    const response = await axios.post(`${ELASTICSEARCH_URL}/${MODELS_INDEX}/_search`, query);

    if (response.data.hits.hits.length > 0) {
      // Return the first model found (assuming modelId is unique)
      return response.data.hits.hits[0]._source;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching model by ID ${modelId}:`, error);
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: { modelId: string } }) {
  const { modelId } = params;

  // Fetch the model from Elasticsearch
  const model = await fetchModelById(modelId);

  if (model) {
    return NextResponse.json(model, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Model not found' }, { status: 404 });
  }
}
