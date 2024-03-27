// Imports
import UserList from '@/components/pages/admin/UsersList';

/*
 * This is the main page for the users section of the admin dashboard.
 * It shows all the users that have been registered.
 * It is possible to delete users from this page.
 */
export default function Dashboard() {
  return (
    <main className='flex flex-grow'>
      <UserList />
    </main>
  );
}
