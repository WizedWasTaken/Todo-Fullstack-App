'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Importing usePathname
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui-library/breadcrumb';

/**
 * Breadcrumb for the admin page
 * @returns Breadcrumb for the admin page
 */
export default function DynamicBreadcrump() {
  const [urls, setUrls] = useState<string[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    setUrls(pathname?.split('/').filter(Boolean) || []);
  }, [pathname]);

  return (
    <Breadcrumb className='absolute p-3'>
      <BreadcrumbList>
        {urls.map((url, index) => {
          const href = `/${urls.slice(0, index + 1).join('/')}`;
          const capitalizedUrl = url.charAt(0).toUpperCase() + url.slice(1);
          return (
            <BreadcrumbItem key={url}>
              {index == 0 && (
                <>
                  <BreadcrumbLink href='/'>Hjem</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
              {index == urls.length - 1 && (
                <BreadcrumbPage>{capitalizedUrl}</BreadcrumbPage>
              )}
              {index < urls.length - 1 && (
                <>
                  <BreadcrumbLink href={href}>{capitalizedUrl}</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
