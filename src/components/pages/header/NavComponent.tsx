'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  normalMenuItems,
  loginRegisterMenuItems,
  profileMenuItems,
} from '@/lib/utils/menuItems';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui-library/button';

/*
 * Navigation bar with linkt to different pages, links can be added in the menuItems.ts file
 */
export default function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className='justify-between w-full flex-row hidden md:flex'>
      <ul className='w-full hidden justify-center flex-row md:flex mt-5 relative'>
        <ul className='flex justify-center gap-2 flex-row absolute'>
          {normalMenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Button
                  asChild
                  className={` ${
                    pathname === item.path
                      ? 'border-b-4 border-b-blue-800 dark:border-b-blue-500 '
                      : ''
                  }`}
                >
                  <Link href={item.path}>{item.name}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
        {!session && (
          <ul className='flex gap-2 justify-end items-end flex-grow'>
            {loginRegisterMenuItems.map((item: any, index: any) => {
              return (
                <li key={index}>
                  <Button
                    className={` ${
                      pathname === item.path
                        ? 'border-b-4 border-b-blue-800 dark:border-b-blue-500 '
                        : ''
                    }`}
                  >
                    <Link href={item.path}>{item.name}</Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
        {session && (
          <ul className='flex gap-2 justify-end items-end flex-grow'>
            {profileMenuItems.map((item: any, index: any) => {
              return (
                <li key={index}>
                  <Button
                    className={` ${
                      pathname === item.path
                        ? 'border-b-4 border-b-blue-800 dark:border-b-blue-500 '
                        : ''
                    }`}
                  >
                    <Link href={item.path}>{item.name}</Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </ul>
    </nav>
  );
}
