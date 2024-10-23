// app/api/resource/[resourceName].ts
import { NextResponse } from 'next/server';
import { getAccessibleResources } from '@/lib/dataFetching';
import { getUserAttributes } from '@/lib/auth';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { resourceName: string } }
) {
  try {
    // Test User Attributes (for testing without Clerk)
    // Uncomment the following block to use test user attributes
    /*
    const testUserAttributes = {
      userId: 'user_member_1',
      orgId: 'org_2nc9c87ihMBSTJxcYc4X4dwmdH4',
      orgRole: 'org:member',
      groups: [],
      role: 'user',
    };
    */

    // Retrieve actual user attributes from Clerk
    const userAttributes = await getUserAttributes();
    const { userId } = userAttributes;
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
      // testUserAttributes, // Pass this only if you uncomment and use testUserAttributes
    });

    return NextResponse.json({ resources });
  } catch (error) {
    console.error(`❌ Error fetching resources of type ${params.resourceName}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
