// // app/api/get-resource-count/route.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import { Client } from '@elastic/elasticsearch';
// import { getAuth } from '@clerk/nextjs/server'; // Adjust based on your authentication provider

// const client = new Client({ node: 'http://localhost:9200' });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   try {
//     const { userId, orgId } = getAuth(req);

//     if (!userId || !orgId) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const { resourceName } = req.body;

//     if (!resourceName) {
//       return res.status(400).json({ error: 'resourceName is required' });
//     }

//     // Construct Elasticsearch count query
//     const countResponse = await client.count({
//       index: resourceName.toLowerCase(),
//       body: {
//         query: {
//           term: { subscriptionId }, // Ensure each resource document has a 'subscriptionId' field
//         },
//       },
//     });

//     const count = countResponse.count || 0;

//     return res.status(200).json({ count });
//   } catch (error) {
//     console.error('Error fetching resource count:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
