'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

/**
 * About page
 * @returns HTML for the about page
 */
export default function About() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return <p>Signed in as {session.user?.email}</p>;
  }

  return <Link href='/api/auth/signin'>Sign in</Link>;
}
