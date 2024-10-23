// app/(auth)/sign-up/[[...sign-up]]/page.tsx

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp afterSignUpUrl="/create-organization" />;
}
