// app/create-organization/page.tsx

import { CreateOrganization } from '@clerk/nextjs';
import Link from 'next/link';

export default function CreateOrganizationPage() {
  return (
    <div>
      <CreateOrganization
        path="/create-organization"
        afterCreateOrganizationUrl="/dashboard"
      />
      <p>
        Or, you can{' '}
        <Link href="/dashboard">
          <span>skip this step</span>
        </Link>
      </p>
    </div>
  );
}
