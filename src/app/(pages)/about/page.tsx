'use client';

import { useSession } from 'next-auth/react';

/**
 * About page
 * @returns HTML for the about page
 */
export default function About() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return <p>Signed in as {session.user?.email}</p>;
  }

  return <a href='/api/auth/signin'>Sign in</a>;
}
