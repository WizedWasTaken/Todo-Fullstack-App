'use client';

// Imports
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { UserData } from '@/lib/types';
import { UserTableColumns } from '@/lib/theme/columnDefinitions';

/*
 * This is the main page for the users section of the admin dashboard.
 * It shows all the users that have been registered.
 * It is possible to delete users from this page.
 */
export function UserTable() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    // Define the async function inside the useEffect
    const fetchData = async () => {
      console.log('Fetching users');
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: UserData[] = await response.json();
        setUsers(data); // Set the users state
      } catch (error) {
        console.error('Failed to fetch users', error);
        // Optionally handle the error state here as well
      }
    };

    // Call the async function
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <DataTable
      data={users}
      columns={UserTableColumns}
    />
  );
}
