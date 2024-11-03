// app/(auth)/sign-up/[[...sign-up]]/page.tsx
'use client';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp afterSignUpUrl="/create-organization" />;
}
