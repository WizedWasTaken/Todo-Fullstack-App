// Everything neccecary for the layout of the app
import { SpeedInsights } from '@vercel/speed-insights/next'; // Analyse the speed of the app
import { Analytics } from '@vercel/analytics/react'; // Analytics for the app
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { inter } from '@/lib/utils/fonts';
import '@/app/globals.scss';

// Theme
import Theme from '@/lib/theme/theme-provider';

// Imports
import Header from '@/components/pages/header/HeaderComponent';
import Footer from '@/components/pages/footer/FooterComponent';

// Auth
import SessionWrapper from '@/lib/utils/authProvider';

// TODO: Look at the Metadata automatic feature
// Metadata for the app
export const metadata: Metadata = {
  title: {
    template: '%s | Todo App',
    default: 'Todo App',
  },
  description: 'The official todo app. Made by Noah Nielsen',
};

/*
 * Layout for the app
 * Everything is wrapped in this layout
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionWrapper>
      <html
        lang='en'
        suppressHydrationWarning
        className='dark'
      >
        <body
          className={
            (inter.className,
            'min-h-screen max-w-screen flex flex-col overflow-x-hidden')
          }
        >
          {/* Theme (Dark/Light) */}
          <Theme>
            {/* Analytic tools for Vercel dashboard */}
            <SpeedInsights />
            <Analytics />
            {/* UI */}
            <Header />
            {children}
            <Footer />
          </Theme>
        </body>
      </html>
    </SessionWrapper>
  );
}
