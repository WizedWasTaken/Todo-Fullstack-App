'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { normalMenuItems, loginRegisterMenuItems } from '@/util/menuItems';

/**
 * HTML for the hamburger menu in the nav bar.
 * This will be shown in the nav bar, and is used to generate the nav items
 * This will only show in mobile view (below 768 px)
 * @returns HTML for the hamburger menu
 */
export default function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Toggles the hamburger menu
   */
  const toggleHamburgerMenu = () => {
    //   TODO: Find a way to make this feel better, instead of being so fast.
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`h-full w-screen md:hidden cursor-pointer `}>
      {/* Hamburger Menu Icon */}
      {/* TODO: Make animated */}
      <div
        className='h-full flex flex-col gap-2 w-full'
        onClick={toggleHamburgerMenu}
      >
        {/* TODO: Hamburger animated icon isn't centered when opened. */}
        <div
          className={`border-2 border-black w-9 transition-transform duration-300 ${
            menuOpen ? 'transform -rotate-45 translate-y-4' : ''
          }`}
        ></div>
        <div
          className={`border-2 border-black w-9 transition-transform duration-300 ${
            menuOpen ? '-translate-x-20' : 'translate-x-0'
          }`}
        ></div>
        <div
          className={`border-2 border-black w-9 transition-transform duration-300 ${
            menuOpen ? 'transform rotate-45 -translate-y-2' : ''
          }`}
        ></div>
      </div>
      {/* Hamburger Menu Content */}
      <div
        className={`absolute p-5 mt-16 mb-6 bottom-10 left-0 top-1 w-full flex flex-end justify-end transition-translate duration-300 ${
          menuOpen ? 'translate-x-0 bg-black bg-opacity-70' : 'translate-x-full'
        }`}
      >
        <ul
          className={`gap-2 w-full ml-10 md:hidden duration-150 ${
            menuOpen ? 'flex translate-x-0 flex-col' : 'translate-x-full'
          }`}
          onClick={toggleHamburgerMenu}
        >
          {normalMenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.path}>
                  <div
                    className={` bg-gray-200 hover:bg-gray-300 px-2 py-2 rounded-md ${
                      pathname === item.path
                        ? 'border-r-4 border-r-blue-500'
                        : 'text-primary-500'
                    }`}
                  >
                    <p className='text-secondary-300'>{item.name}</p>
                  </div>
                </Link>
              </li>
            );
          })}
          {loginRegisterMenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.path}>
                  <div
                    className={` bg-gray-200 hover:bg-gray-300 p-2 py-2 rounded-md ${
                      pathname === item.path
                        ? 'border-r-4 border-r-blue-500'
                        : 'text-primary-500'
                    }`}
                  >
                    <p className='text-secondary-300'>{item.name}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
