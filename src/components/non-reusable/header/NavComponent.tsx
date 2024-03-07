'use client';

import { normalMenuItems, loginRegisterMenuItems } from '@/util/menuItems';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log('toggleMenu');
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  return (
    <nav className='container mx-15 flex justify-between flex-row'>
      <div className='md:hidden'>
        <button
          className='text-primary-500 focus:outline-none'
          onClick={toggleMenu}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            {isMenuOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>
      </div>
      <ul
        className={`gap-10 w-full md:flex ${
          isMenuOpen ? 'flex flex-col' : 'hidden'
        }`}
      >
        {normalMenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link href={item.path}>
                <div
                  className={` bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md ${
                    pathname === item.path
                      ? 'bg-gray-700 hover:bg-gray-800 text-white'
                      : 'text-primary-500'
                  }`}
                >
                  <p className='text-secondary-300'>{item.name}</p>
                </div>
              </Link>
            </li>
          );
        })}
        <ul
          className={`gap-10 w-full md:hidden ${
            isMenuOpen ? 'flex justify-end gap-4' : 'hidden'
          }`}
        >
          {loginRegisterMenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.path}>
                  <div className='bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md'>
                    <p className='text-secondary-300'>{item.name}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </ul>
      <ul className='justify-end gap-8 mt-4 md:mt-0 md:gap-6 hidden md:flex'>
        <li>
          <Link href='/login'>
            <button className='bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md'>
              Login
            </button>
          </Link>
        </li>
        <li>
          <Link href='/register'>
            <button className='bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md'>
              Register
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
