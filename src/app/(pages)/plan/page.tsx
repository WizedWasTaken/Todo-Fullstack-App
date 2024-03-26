'use client';

import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session, status } = useSession();

  if (status === 'loading')
    return (
      <p className='flex flex-grow align-center justify-center'>Loading...</p>
    );
  return (
    <pre className='flex flex-grow'>{JSON.stringify(session, null, 2)}</pre>
  );
}
