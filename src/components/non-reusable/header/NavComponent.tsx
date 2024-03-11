'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { normalMenuItems, loginRegisterMenuItems } from '@/lib/utils/menuItems';

/**
 * Navigation bar with linkt to different pages, links can be added in the menuItems.ts file
 * @returns HTML for the nav bar
 */
export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className='justify-between w-full flex-row hidden md:flex'>
      <ul className='w-full hidden justify-center flex-row md:flex mt-5 relative'>
        <ul className='flex justify-center gap-2 flex-row absolute'>
          {normalMenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={`dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white text-black bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md ${
                    pathname === item.path
                      ? 'border-b-4 border-b-blue-500'
                      : 'text-primary-500'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className='flex gap-2 justify-end items-end w-full'>
          {loginRegisterMenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={` dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white text-black bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md ${
                    pathname === item.path
                      ? 'border-b-4 border-b-blue-500'
                      : 'text-primary-500'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </ul>
    </nav>
  );
}
