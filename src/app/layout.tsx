import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { inter } from '@/util/fonts';
import '@/styling/globals.scss';

// Imports
import Header from '@/components/non-reusable/header/HeaderComponent';
import Footer from '@/components/non-reusable/FooterComponent';

export const metadata: Metadata = {
  title: {
    template: '%s | Todo App',
    default: 'Todo App',
  },
  description: 'The official todo app. Made by Noah Nielsen',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={(inter.className, 'min-h-screen flex flex-col')}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
