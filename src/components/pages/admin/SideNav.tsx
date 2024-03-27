// Imports
import Link from 'next/link';
import { adminMenuItems } from '@/lib/utils/menuItems'; // Menu items for the admin page

/*
 * Side navigation for the admin page
 */
export default function SideNav() {
  return (
    <aside className='w-52 mr-2 border-r-2 max-h-fit overflow-y-auto border-slate-400'>
      <nav>
        <ul className='flex flex-col gap-3 py-5'>
          {adminMenuItems.map((link: any) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className='flex mx-5 text-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white text-black bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-primary-500'
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
