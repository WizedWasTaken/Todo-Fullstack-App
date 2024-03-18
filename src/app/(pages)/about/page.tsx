// mark as client component
'use client';

// importing necessary functions
import { useSession, signOut } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

/**
 *
 * @returns HTML for the about page
 */
export default function About() {
  // extracting data from usesession as session
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      console.log('No session');
    }
  }, [session]);

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='w-44 h-44 relative mb-4'>
          <Image
            src={session.user?.image as string}
            fill
            alt=''
            className='object-cover rounded-full'
          />
        </div>
        <p className='text-2xl mb-2'>
          Welcome <span className='font-bold'>{session.user?.name}</span>.
          Signed In As
        </p>
        <p className='font-bold mb-4'>{session.user?.email}</p>
        <button
          className='bg-red-600 py-2 px-6 rounded-md'
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  // rendering components for not logged in users
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <p className='text-2xl mb-2'>Not Signed In</p>
      <p>Brug /register for at logge ind med vores OAuth muligheder</p>
      <Link
        href='/register'
        className='rounded-md w-25 bg-blue-500 p-2 mt-5'
      >
        Gå til siden
      </Link>
    </div>
  );
}
