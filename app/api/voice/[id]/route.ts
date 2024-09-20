// app/api/voice/[id]/route.ts

import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs"; // Ensure you have the appropriate client or SDK
import { auth } from "@clerk/nextjs";
import { Readable } from "stream"; // Import Readable from 'stream'
import axios from "axios";

// Define your Elasticsearch configuration
const ELASTICSEARCH_URL = 'http://localhost:9200'; // Update if different
const MODELS_INDEX = 'complete_trained_models'; // Your Elasticsearch index name

// Fetch model from Elasticsearch by modelId
async function fetchModelById(modelId: string) {
  const query = {
    query: {
      match: { modelId }, // Ensure 'modelId' matches the field in your Elasticsearch index
    },
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

// Helper function to convert Readable stream to Buffer
async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth();
    const { id } = params; // model.replicate_id
    const body = await req.json();
    const { prompt, voiceId, output_format, amount } = body;

    // Validate required fields
    if (!prompt || !voiceId) {
      return NextResponse.json(
        { message: "Prompt and Voice ID are required" },
        { status: 400 }
      );
    }

    // Initialize ElevenLabsClient
    const elevenlabs = new ElevenLabsClient({
      apiKey: process.env.XI_API_KEY, // Ensure this is set in env variables
    });

    // Validate and set a maximum limit for 'amount' to prevent abuse
    const MAX_AMOUNT = 5;
    const generationAmount = Math.min(amount || 1, MAX_AMOUNT);

    // Generate multiple voices based on 'amount'
    const audioPromises = Array.from({ length: generationAmount }, () =>
      elevenlabs.generate({
        voice: voiceId,
        model_id: id,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
        text: prompt,
      })
    );

    // Await all audio generation promises
    const audioResponses = await Promise.all(audioPromises);

    // Convert each Readable stream to Buffer
    const audioBuffers = await Promise.all(
      audioResponses.map((stream) => streamToBuffer(stream))
    );

    // Convert Buffers to Base64 strings for Data URIs
    const audioUrls = audioBuffers.map((buffer) => {
      const base64 = buffer.toString("base64");
      return `data:audio/mpeg;base64,${base64}`;
    });

    // Return the audio URLs as Data URIs
    return NextResponse.json({ voices: audioUrls }, { status: 200 });
  } catch (error: any) {
    console.error("[VOICE_ERROR]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
