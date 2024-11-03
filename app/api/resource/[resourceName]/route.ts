// app/api/resource/[resourceName]/route.ts

import { NextResponse } from 'next/server';
import { getAccessibleResources } from '@/lib/dataFetching';
import { getUserAttributes } from '@/lib/auth';
import { NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { resourceName: string } }
) {
  try {
    // Get auth context from Clerk
    const auth = getAuth(request);
    const { userId, orgId, orgRole } = auth;

    if (!userId) {
      console.warn('Unauthenticated access to resource API.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user attributes
    const userAttributes = await getUserAttributes(request, { userId, orgId, orgRole });

    const resourceName = params.resourceName.toLowerCase(); // e.g., 'goals'

    const { searchParams } = new URL(request.url);
    const sizeParam = searchParams.get('size');
    const size = sizeParam ? parseInt(sizeParam, 10) : 100; // Default to 100 if no size is specified
    const action = 'read';

    // Fetch accessible resources directly using resourceName as the Elasticsearch index
    const resources = await getAccessibleResources({
      userId: userId,
      action: action,
      resourceName: resourceName, // e.g., 'goals'
      size: size,
      userAttributes, // Pass user attributes for access control
    });

    return NextResponse.json({ resources });
  } catch (error: any) {
    console.error(`❌ Error fetching resources of type ${params.resourceName}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
