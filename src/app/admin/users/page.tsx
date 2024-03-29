// Imports
import { UserTable } from '@/app/admin/users/user-table';

/*
 * This is the main page for the users section of the admin dashboard.
 * It shows all the users that have been registered.
 * It is possible to delete users from this page.
 */
export default async function Dashboard() {
  return (
    <main className='flex flex-col'>
      <UserTable />
    </main>
  );
}
