'use client';

// Imports
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  normalMenuItems,
  loginRegisterMenuItems,
  profileMenuItems,
} from '@/lib/utils/menuItems';
import { useSession } from 'next-auth/react';

/*
 * HTML for the hamburger menu in the nav bar.
 * This will be shown in the nav bar, and is used to generate the nav items
 * This will only show in mobile view (below 768 px)
 */
export default function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const hamburgerRef = useRef<HTMLDivElement>(null);
  const [mainContainerHeight, setMainContainerHeight] = useState<number>(0);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const { data: session } = useSession();

  /*
   * Adds an event listener to the window to listen for resize events
   * When the window is resized, the height of the main container and the header is recalculated
   * This is used to set the height of the hamburger menu for all screen sizes
   */
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
      const mainContainer = document.querySelector('main');
      const headerContainer = document.querySelector('header');
      if (mainContainer && headerContainer) {
        setMainContainerHeight(mainContainer.clientHeight);
        setHeaderHeight(headerContainer.clientHeight);
      }
    });
  }, []);

  /*
   * Sets the height of the main container and the header
   * This is used to set the height of the hamburger menu
   * and the margin top of the hamburger menu
   */
  useEffect(() => {
    const mainContainer = document.querySelector('main');
    const headerContainer = document.querySelector('header');
    if (mainContainer && headerContainer) {
      setMainContainerHeight(mainContainer.clientHeight);
      setHeaderHeight(headerContainer.clientHeight);
    }
  }, []);

  /*
   * Sets the height of the hamburger menu to the height of the main container
   * Also sets the margin top to the height of the header
   */
  useEffect(() => {
    if (hamburgerRef.current) {
      hamburgerRef.current.style.height = `${mainContainerHeight}px`;
      hamburgerRef.current.style.marginTop = `${headerHeight + 2}px`;
    }
  });

  /*
   * Toggles the hamburger menu
   */
  const toggleHamburgerMenu = () => {
    //   TODO: Find a way to make this feel better, instead of being so fast.
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`md:hidden cursor-pointer`}>
      {/* Hamburger Menu Icon */}
      {/* TODO: Make animated */}
      <div
        className='h-full flex flex-col gap-2 w-full'
        onClick={toggleHamburgerMenu}
      >
        {/* TODO: Hamburger animated icon isn't exactly centered when opened. */}
        <div
          className={`border-2 border-black dark:border-white w-9 transition-transform duration-300 ${
            menuOpen ? 'transform -rotate-45 translate-y-4' : ''
          }`}
        ></div>
        <div
          className={`border-2 border-black dark:border-white w-9 transition-transform duration-300 ${
            menuOpen ? '-translate-x-20' : 'translate-x-0'
          }`}
        ></div>
        <div
          className={`border-2 border-black dark:border-white w-9 transition-transform duration-300 ${
            menuOpen ? 'transform rotate-45 -translate-y-2' : ''
          }`}
        ></div>
      </div>
      {/* Hamburger Menu Content */}
      {/* TODO: Hidden for now, as it otherwise creates overflow */}
      <div
        className={`absolute p-5 left-0 w-full flex top-0 flex-end justify-end transition-translate duration-300 z-50  ${
          menuOpen
            ? 'translate-x-0 dark:bg-white dark:bg-opacity-50 bg-black bg-opacity-70'
            : 'translate-x-full'
        }`}
        ref={hamburgerRef}
      >
        <ul
          className={`gap-2 w-full md:hidden duration-150 ${
            menuOpen ? 'flex translate-x-0 flex-col' : 'translate-x-full'
          }`}
          onClick={toggleHamburgerMenu}
        >
          {menuOpen &&
            normalMenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.path}>
                    <div
                      className={` dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white text-black bg-gray-200 hover:bg-gray-300 w-24 ml-auto px-2 py-2 rounded-md ${
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
          {!session &&
            menuOpen &&
            loginRegisterMenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.path}>
                    <div
                      className={` dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white text-black bg-gray-200 hover:bg-gray-300 w-24 ml-auto p-2 py-2 rounded-md ${
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
          {session &&
            menuOpen &&
            profileMenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.path}>
                    <div
                      className={`dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white text-black bg-gray-200 hover:bg-gray-300 w-24 ml-auto p-2 py-2 rounded-md ${
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
