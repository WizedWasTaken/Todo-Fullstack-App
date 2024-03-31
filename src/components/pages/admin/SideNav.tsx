// Imports
import Link from 'next/link';
import { adminMenuItems } from '@/lib/utils/menuItems'; // Menu items for the admin page
import { Button } from '@/components/ui-library/button';

/*
 * Side navigation for the admin page
 */
export default function SideNav() {
  return (
    <aside className='w-52 mr-2 border-r-2 max-h-fit overflow-y-auto border-slate-400'>
      <nav>
        <ul className='flex flex-col gap-3 p-5'>
          {adminMenuItems.map((link: any) => (
            <li key={link.name}>
              <Button
                asChild
                className='w-full'
              >
                <Link href={link.path}>{link.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
