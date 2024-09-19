import { NextResponse } from "next/server";

const ELASTICSEARCH_ENDPOINT = "";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 }
      );
    }

    // Send data to Elasticsearch
    const response = await fetch(ELASTICSEARCH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // If your Elasticsearch instance requires authentication, add the Authorization header here:
        // 'Authorization': 'Basic ' + btoa('username:password')
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to save data to Elasticsearch." },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Data submitted successfully!" });
  } catch (error) {
    console.error("Error submitting data to Elasticsearch:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing the form." },
      { status: 500 }
    );
  }
}
