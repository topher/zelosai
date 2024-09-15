import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = "https://lj85eec5vnb3qkei.us-east-1.aws.endpoints.huggingface.cloud";
const API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;
const ELASTICSEARCH_URL = 'http://localhost:9200'; // Update with your Elasticsearch URL
const MODELS_INDEX = 'complete_trained_models'; // Update with your index name

// Fetch model from Elasticsearch by modelId
async function fetchModelById(modelId: string) {
  try {
    const query = {
      query: {
        match: { modelId }
      }
    };

    const response = await axios.post(`${ELASTICSEARCH_URL}/${MODELS_INDEX}/_search`, query);

    if (response.data.hits.hits.length > 0) {
      return response.data.hits.hits[0]._source;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching model by ID ${modelId}:`, error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, resolution, modelId } = await req.json();

    // Fetch the model dynamically from Elasticsearch
    const model = await fetchModelById(modelId);

    console.log(model, "💎");

    if (!model) {
      return NextResponse.json({ message: "Model not found" }, { status: 404 });
    }

    let modifiedPrompt = prompt;

    if (model.subject_prompt_alias) {
      model.subject_prompt_alias.forEach((alias: string) => {
        const regex = new RegExp(`\\b${alias}\\b`, 'gi');
        modifiedPrompt = modifiedPrompt.replace(regex, `${model.subject_prompt_key}:1.1`);
      });
    }

    console.log(modifiedPrompt, "💎");

    console.log({
      method: "POST",
      headers: {
        "Accept": "image/png",
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: modifiedPrompt,
        parameters: {
          negative_prompt: "",
          width: parseInt(resolution.split("x")[0]),
          height: parseInt(resolution.split("x")[1]),
        }
      })
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Accept": "image/png",
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: modifiedPrompt,
        parameters: {
          negative_prompt: "",
          width: parseInt(resolution.split("x")[0]),
          height: parseInt(resolution.split("x")[1]),
        }
      })
    });

    if (!response.ok) {
      return NextResponse.json({ message: response.statusText }, { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
