import type { Metadata } from 'next';
import SideNav from '@/components/admin/SideNav';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: '%s | Todo App',
    default: 'Todo App',
  },
  description: 'The official todo app. Made by Noah Nielsen',
};

// TODO: Find a way to make the app router work with server calls, so that the app can be server side rendered

/**
 * Layout for the app
 * @param param0 Children to be rendered
 * @param param0.children Children to be rendered
 * @returns HTML layout for the app
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-grow'>
      <SideNav />
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
