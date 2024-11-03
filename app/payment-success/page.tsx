// app/payment-success/page.tsx

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    async function fetchSession() {
      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`/api/stripe-webhook/verify-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('❌ Error verifying session:', error);
        setStatus('error');
      }
    }

    fetchSession();
  }, [sessionId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Payment failed or could not be verified.</div>;
  }

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your subscription has been updated.</p>
      <button onClick={() => router.push('/dashboard')} className="mt-4 btn btn-primary">
        Go to Dashboard
      </button>
    </div>
  );
}
