// mark as client component
'use client';

// importing necessary functions
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';

/**
 *
 * @returns HTML for the dashboard page
 */
export default function Dashboard() {
  // extracting data from usesession as session
  const { data: session } = useSession();
  const router = useRouter();

  async function signOutButton() {
    await signOut({ redirect: false }); // Prevent automatic redirection after sign out
    router.refresh(); // Reload the current page
  }

  if (session) {
    return (
      <div className='flex h-full flex-col justify-center items-center'>
        <div className='w-44 h-44 relative mb-4'>
          <Image
            src={session.user?.image as string}
            fill
            alt=''
            className='object-cover rounded-full'
          />
        </div>
        <p className='text-2xl mb-2'>
          Velkommen <span className='font-bold'>{session.user?.name}</span>.
          Logged ind som
        </p>
        <p className='font-bold mb-4'>{session.user?.email}</p>
        <button
          className='bg-red-600 py-2 px-6 rounded-md'
          onClick={signOutButton}
        >
          Log ud
        </button>
      </div>
    );
  }

  return 'Du er ikke logget ind. Log ind for at se denne side.';
}
