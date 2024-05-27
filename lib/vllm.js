import axios from 'axios';

// Define your endpoint URL and API token
const API_URL = "https://rl67cgp1m02b53hj.us-east-1.aws.endpoints.huggingface.cloud";
const API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;

// Function to generate text using the Inference Endpoint
export async function generateText(prompt) {
  try {
    const response = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
}