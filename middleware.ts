// middleware.ts

import { NextResponse } from 'next/server';
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api", "/sign-in", "/sign-up"],
  afterAuth: async (auth, req) => {
    console.log("User authenticated:", auth.userId);
    // Minimal logic here, avoid server-side dependencies
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)',
    '/api/resource/:path*',
  ],
};
