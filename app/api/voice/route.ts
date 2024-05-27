import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs";
import { ElevenLabsClient } from "elevenlabs";
import { checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

// Define environment variables with types
const API_URL = "https://api.elevenlabs.io/v1/text-to-speech";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, voiceId, modelId } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // const freeTrial = await checkApiLimit(); // Replace with your function implementation
    // const isPro = await checkSubscription(); // Replace with your function implementation

    // if (!freeTrial && !isPro) {
    //   return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    // }

    const elevenlabs = new ElevenLabsClient({
      apiKey: process.env.XI_API_KEY
    });

    const audio = await elevenlabs.generate({
      voice: voiceId, // Assuming voiceId corresponds to the voice parameter
      model_id: modelId,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
      text: prompt
    });

    return new Response(audio as any, {
      headers: { "Content-Type": "audio/mpeg" }
    });
  } catch (error) {
    console.error("[VOICE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
