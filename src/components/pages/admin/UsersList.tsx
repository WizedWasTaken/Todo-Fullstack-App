'use client';

// Imports
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

/*
 * Users list component
 * Component will fetch all users from the API and display them in a table for easy overview
 */
export default function UsersList() {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: UserData[] = await response.json();
        setUsers(data);
      } catch (error) {
        setUsers([]);
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
