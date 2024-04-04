'use client';

// Imports
import Link from 'next/link';
import { dashboardMenuItems } from '@/lib/utils/menuItems'; // Menu items for the admin page
import { Button } from '@/components/ui-library/button'; // Button component
import { useState } from 'react';

/*
 * Side navigation for the admin page
 */
export default function SideNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div
        className='flex flex-col gap-2 absolute top-5 right-5 z-50 cursor-pointer overflow-hidden'
        onClick={toggleHamburgerMenu}
      >
        <div
          className={`border-2 border-black dark:border-white w-9 transition-transform duration-300 ${
            menuOpen ? 'transform -rotate-45 translate-y-4' : ''
          }`}
        ></div>
        <div
          className={`border-2 border-black dark:border-white w-9 transition-transform duration-300 ${
            menuOpen ? 'translate-x-20' : 'translate-x-0'
          }`}
        ></div>
        <div
          className={`border-2 border-black dark:border-white w-9 transition-transform duration-300 ${
            menuOpen ? 'transform rotate-45 -translate-y-2' : ''
          }`}
        ></div>
      </div>
      <aside
        className={`border-r-2 overflow-y-auto border-slate-400 transition-all ease-linear absolute md:block z-50 pt-5 h-full bg-primary/20 left-0 top-0 ${
          menuOpen ? 'w-[60vw] md:w-[20vw]' : 'w-0 border-r-0'
        }`}
      >
        <nav>
          <ul className='flex flex-col gap-3 p-5 h-full'>
            {dashboardMenuItems.map((link: any) => (
              <li key={link.name}>
                <Button
                  className='w-full'
                  asChild
                  onClick={toggleHamburgerMenu}
                >
                  <Link href={link.path}>{link.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
