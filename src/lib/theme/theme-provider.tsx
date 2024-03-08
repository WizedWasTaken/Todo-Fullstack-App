'use client';

import { ThemeProvider } from 'next-themes';

/**
 * @param param0 children
 * @param param0.children children
 * @returns ThemeProvider for the app
 */
export default function Theme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute='class'>{children}</ThemeProvider>;
}
