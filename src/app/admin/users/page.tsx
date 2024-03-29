// Imports
import { DataTable } from '@/components/data-table/data-table';

import { UserData } from '@/lib/types';
import { UserTableColumns } from '@/lib/theme/columnDefinitions';

async function getData(): Promise<UserData[]> {
  return [
    {
      _id: '1',
      name: 'User 1',
      email: 'user1@gmail.com',
      provider: 'google',
      group: ['admin'],
      providerId: '12345',
      image: 'https://via.placeholder.com/150',
    },
    {
      _id: '2',
      name: 'User 2',
      email: 'user2@gmail.com',
      provider: 'google',
      group: ['admin'],
      providerId: '12345',
      image: 'https://via.placeholder.com/150',
    },
    {
      _id: '3',
      name: 'User 3',
      email: 'user3@gmail.com',
      provider: 'google',
      group: ['admin'],
      providerId: '12345',
      image: 'https://via.placeholder.com/150',
    },
  ];
}

/*
 * This is the main page for the users section of the admin dashboard.
 * It shows all the users that have been registered.
 * It is possible to delete users from this page.
 */
export default async function Dashboard() {
  const data = await getData();
  return (
    <main className='flex flex-col flex-grow'>
      <DataTable
        data={data}
        columns={UserTableColumns}
      />
    </main>
  );
}
