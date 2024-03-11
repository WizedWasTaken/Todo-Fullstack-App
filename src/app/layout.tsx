// Everything neccecary for the layout of the app
import { SpeedInsights } from '@vercel/speed-insights/next'; // Analyse the speed of the app
import { Analytics } from '@vercel/analytics/react'; // Analytics for the app
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { inter } from '@/lib/utils/fonts';
import '@/styling/globals.scss';

// Theme
import Theme from '@/lib/theme/theme-provider';

// Imports
import Header from '@/components/non-reusable/header/HeaderComponent';
import Footer from '@/components/non-reusable/FooterComponent';

// Auth
import SessionWrapper from '@/components/non-reusable/authProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Todo App',
    default: 'Todo App',
  },
  description: 'The official todo app. Made by Noah Nielsen',
};

/**
 * Layout for the app
 * @param param0 Children to be rendered
 * @param param0.children Children to be rendered
 * @returns HTML layout for the app
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
            (inter.className, 'min-h-screen flex flex-col overflow-x-hidden')
          }
        >
          <Theme>
            <SpeedInsights />
            <Analytics />
            <Header />
            {children}
            <Footer />
          </Theme>
        </body>
      </html>
    </SessionWrapper>
  );
}
