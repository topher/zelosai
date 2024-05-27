import { NextRequest, NextResponse } from 'next/server';
import { complete_trained_models } from '@/app/data'; // Adjust the import path as necessary

export async function GET(req: NextRequest, { params }: { params: { modelId: string } }) {
  const { modelId } = params;

  const model = complete_trained_models.find(m => m.modelId === modelId);

  if (model) {
    return NextResponse.json(model, { status: 200 });
  } else {
    return NextResponse.json({ message: "Model not found" }, { status: 404 });
  }
}
