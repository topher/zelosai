import { NextRequest, NextResponse } from 'next/server';
import { complete_trained_models } from '@/app/data'; // Adjust the import path as necessary

const API_URL = "https://lj85eec5vnb3qkei.us-east-1.aws.endpoints.huggingface.cloud";
const API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const { prompt, resolution, modelId } = await req.json();

    const model = complete_trained_models.find(m => m.modelId === modelId);


    console.log(model, "💎");

    if (!model) {
      return NextResponse.json({ message: "Model not found" }, { status: 404 });
    }

    let modifiedPrompt = prompt;

    if (model.subject_prompt_alias) {
      model.subject_prompt_alias.forEach(alias => {
        const regex = new RegExp(`\\b${alias}\\b`, 'gi');
        modifiedPrompt = modifiedPrompt.replace(regex, `${model.subject_prompt_key}:1.1`);
      });
    }

    console.log(modifiedPrompt, "💎");
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
