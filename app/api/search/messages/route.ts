// // app/api/search/messages/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { getAccessibleResources } from '@/lib/dataFetching';
// import { getAuth } from '@clerk/nextjs/server';

// /**
//  * Handles POST requests to /api/search/messages
//  */
// // app/api/search/messages/route.ts

// export async function POST(request: NextRequest) {
//     console.log('POST /api/search/messages called');
  
//     try {
//       // Authentication
//       const auth = getAuth(request);
//       const { userId, orgId } = auth;
//       console.log(`Authenticated userId: ${userId}, orgId: ${orgId}`);
  
//       if (!userId || !orgId) {
//         console.log('Unauthorized access attempt.');
//         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//       }
  
//       // Parse request
//       const body = await request.json();
//       console.log('Request body:', body);
  
//       const { requests } = body;
  
//       if (!requests || !Array.isArray(requests)) {
//         console.log('Invalid request format.');
//         return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
//       }
  
//       // Extract parameters
//       const [{ params }] = requests;
//       const { query = '', page = 0, hitsPerPage = 10, filters = '' } = params;
//       console.log(`Search parameters - Query: ${query}, Page: ${page}, HitsPerPage: ${hitsPerPage}, Filters: ${filters}`);
  
//       // Fetch resources
//       const resources = await getAccessibleResources({
//         userId,
//         action: 'read',
//         resourceName: 'messages',
//         size: hitsPerPage,
//         from: page * hitsPerPage,
//         query,
//         filters,
//         userAttributes: { userId, orgId },
//       });
//       console.log('Fetched resources:', resources);
  
//       // Format response
//       const totalHits = resources.length;
//       const result = {
//         results: [
//           {
//             hits: resources.map((resource: any, index: number) => ({
//               ...resource,
//               objectID: resource.id || index.toString(),
//             })),
//             nbHits: totalHits,
//             page,
//             nbPages: Math.ceil(totalHits / hitsPerPage),
//             hitsPerPage,
//             processingTimeMS: 1,
//             query,
//             params: '',
//           },
//         ],
//       };
//       console.log('Formatted search result:', result);
  
//       return NextResponse.json(result);
//     } catch (error: any) {
//       console.error('Error handling search:', error);
//       return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
//   }
  
