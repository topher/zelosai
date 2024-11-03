// // app/api/resource/[resourceName]/[resourceId]/save.ts

// import { NextResponse } from 'next/server';
// import { getUserAttributes } from '@/lib/auth';
// import { updateFeatureCount } from '@/lib/user';

// export async function POST(
//   request: Request,
//   { params }: { params: { resourceName: string; resourceId: string } }
// ) {
//   const { resourceName, resourceId } = params;

//   try {
//     const userAttributes = await getUserAttributes();
//     const { userId } = userAttributes;

//     // Logic to save the resource (e.g., add to saved profiles)

//     // Increment the saved profiles count
//     await updateFeatureCount(userId, 'savedProfiles');

//     return NextResponse.json({ message: 'Resource saved successfully' });
//   } catch (error) {
//     console.error('Error saving resource:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
