// /app/api/interests/route.ts

import { NextResponse } from 'next/server';
import { searchIndex, ensureIndexExists } from '@/lib/elasticsearch';

const INDEX = 'interests'; // Ensure this index exists

// Define the mappings for the 'interests' index
const interestsMappings = {
  properties: {
    id: { type: 'keyword' },
    name: { type: 'text' },
    parent_id: { type: 'keyword', null_value: '0' }
  }
};

// Initialize the index when the module is loaded
(async () => {
  try {
    await ensureIndexExists(INDEX, interestsMappings);
    console.log(`Index "${INDEX}" is ready.`);
  } catch (error) {
    console.error(`Error ensuring index "${INDEX}":`, error);
  }
})();

/**
 * GET Method
 * Retrieves interests based on query parameters
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = url.searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 10000;

  try {
    const data = await searchIndex(INDEX, { limit });
    // Ensure IDs are strings
    const processedData = data.map(item => ({
      ...item,
      id: String(item.id)
    }));
    return NextResponse.json({ data: processedData });
  } catch (error) {
    console.error(`Error fetching ${INDEX}:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
