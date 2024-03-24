'use client';
import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui-library/table';
import { UserData } from '@/lib/types';

// TODO: Add table splitting, pagination, and sorting features for potential large datasets
// TODO: Responsive table for mobile devices
export default function UsersList() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/admin/users');
        const data: UserData[] = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        return;
      }
    }

    fetchUsers();
  }, []);

  return (
    <>
      {users && users.length === 0 && <p>No users found</p>}
      {users && users.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Groups</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: UserData) => (
              <TableRow key={user._id}>
                <TableCell className='font-medium'>{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.provider}</TableCell>
                <TableCell>{user.group.join(' ')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={5}
                className='text-center'
              >
                Total users: {users.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
}
