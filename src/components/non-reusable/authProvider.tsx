'use client';
import { SessionProvider } from 'next-auth/react';

/**
 * @param param0 children
 * @param param0.children children
 * @returns Session Provider for the app
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
