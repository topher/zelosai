// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: { cookies: { get: (arg0: string) => any; }; }) {
  // Custom authentication logic here
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect('/login');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
