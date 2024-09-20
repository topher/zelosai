// app/api/text/[id]/route.ts

import { NextResponse } from "next/server";
import { generateText } from "@/lib/vllm"; // Ensure this function is implemented
import { auth } from "@clerk/nextjs";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth();
    const { id } = params; // model.replicate_id
    const body = await req.json();
    const { prompt, amount } = body;

    if (!prompt) {
      return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
    }

    const formattedPrompt = `
      ${prompt}
    `;

    // Generate multiple texts based on 'amount'
    const textPromises = Array.from({ length: amount }, () => generateText(formattedPrompt));

    const generatedTexts = await Promise.all(textPromises);

    return NextResponse.json({ generated_texts: generatedTexts }, { status: 200 });
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
