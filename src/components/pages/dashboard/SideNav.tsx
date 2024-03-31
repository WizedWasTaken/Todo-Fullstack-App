// Imports
import Link from 'next/link';
import { dashboardMenuItems } from '@/lib/utils/menuItems'; // Menu items for the admin page
import { Button } from '@/components/ui-library/button'; // Button component

/*
 * Side navigation for the admin page
 */
export default function SideNav() {
  return (
    <aside className='min-w-52 border-r-2 overflow-y-auto border-slate-400'>
      <nav>
        <ul className='flex flex-col gap-3 p-5'>
          {dashboardMenuItems.map((link: any) => (
            <li key={link.name}>
              
              <Button className='w-full' asChild>
                <Link
                  href={link.path}
                  
                >
                  {link.name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
