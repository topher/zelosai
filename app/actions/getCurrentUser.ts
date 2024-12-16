import { getAuth } from "@clerk/nextjs/server"; // Import Clerk's getAuth function
import { NextRequest } from "next/server"; // Import NextRequest if using Next.js API routes or middleware
import userData from "@/app/data"; // Assuming you have your local data in data.tsx

export async function getSession(req: NextRequest) {
  try {
    const { userId } = await getAuth(req); // Pass the req object here

    if (!userId) {
      console.log("User not authenticated");
      return null;
    }

    return { userId }; // Return userId as session equivalent
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

export default async function getCurrentUser(req: NextRequest) {
  try {
    const session = await getSession(req);

    if (!session?.userId) {
      console.log("No session or userId");
      return null;
    }

    // Retrieve user data from your local data file
    const currentUser = userData.find((user) => user.id === session.userId);

    if (!currentUser) {
      console.log("User not found in local data");
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt?.toISOString(),
      updatedAt: currentUser.updatedAt?.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    console.error("Failed to get current user:", error);
    return null;
  }
}
