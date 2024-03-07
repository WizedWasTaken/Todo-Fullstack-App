import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { normalMenuItems, loginRegisterMenuItems } from '@/util/menuItems';

export default function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Toggles the hamburger menu
   * @returns void
   */
  const toggleHamburgerMenu = () => {
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
        <div
          className={`border-2 border-black w-9 transition-transform duration-300`}
        ></div>
        <div
          className={`border-2 border-black w-9 transition-opacity duration-300`}
        ></div>
        <div
          className={`border-2 border-black w-9 transition-transform duration-300`}
        ></div>
      </div>
      {/* Hamburger Menu Content */}
      <div
        className={`absolute p-5 inset-0 mt-20 mb-5 bottom-5 top-3 h-full w-full flex flex-end justify-end transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 bg-black bg-opacity-50' : 'opacity-0'
        }`}
      >
        <ul
          className={`gap-2 w-full ml-10 md:hidden duration-150 ${
            menuOpen ? 'flex opacity-100 flex-col' : 'opacity-0'
          }`}
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
