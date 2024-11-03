// app/api/resource-count/route.js

import { NextResponse } from 'next/server';
import { getResourceCount } from '@/lib/resource'; // Adjust the path as necessary

export async function GET(request: { url: string | URL; }) {
  try {
    // Parse the URL and extract query parameters
    const { searchParams } = new URL(request.url);
    const resourceName = searchParams.get('resourceName');
    const orgId = searchParams.get('orgId') || '';
    const userId = searchParams.get('userId');

    console.log(`Received GET request at /api/resource-count`);
    console.log(`resourceName: ${resourceName}, orgId: ${orgId}, userId: ${userId}`);

    // Validate required parameters
    if (!resourceName || !userId) {
      console.log('Missing resourceName or userId');
      return NextResponse.json({ error: 'Missing resourceName or userId' }, { status: 400 });
    }

    // Call the getResourceCount function
    const count = await getResourceCount(resourceName, orgId, userId);
    console.log(`Resource count: ${count}`);

    // Return the count in the response
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error(`Error in /api/resource-count:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
