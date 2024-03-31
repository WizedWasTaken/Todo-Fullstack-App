import type { Metadata } from 'next';
import SideNav from '@/components/pages/dashboard/SideNav';
import { ReactNode } from 'react';
import AdminBreadcrumb from '@/components/pages/breadcrumb';

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
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-grow'>
      <SideNav />
      <div className='relative flex-grow'>
        <AdminBreadcrumb />
        <div className='flex-grow px-5 mt-8'>{children}</div>
      </div>
    </div>
  );
}
