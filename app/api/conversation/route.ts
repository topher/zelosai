import { NextResponse } from "next/server";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { generateText } from "@/lib/vllm";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { messages, default_language } = body;
    console.log(body, "conversation 💎")

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const formattedPrompt = `
      return the response in ${default_language}. Only how Rigoberto should reply in conversation, nothing more: ${messages.at(-1)["content"]}
    `;

    const generatedText = await generateText(formattedPrompt);

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if (!freeTrial && !isPro) {
    //   return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    // }

    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    return NextResponse.json(generatedText);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}