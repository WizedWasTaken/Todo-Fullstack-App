'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SideNav() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className='flex bg-gray-200 dark:bg-gray-900 text-white p-5'>
      <ul
        className={`w-20 hover:w-64 transition-all flex flex-col  ${
          isHovered ? 'text-xl gap-2' : 'text-4xl text-center gap-5'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <li>
          <Link href='/admin/dashboard'>
            🤔 {isHovered && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link href='/admin/settings'>
            ⚙️ {isHovered && <span>Settings</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
