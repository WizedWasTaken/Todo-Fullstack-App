import { useLoaderData } from 'next/app';

export default function Dashboard() {
  const { users } = useData();

  return (
    <main className='flex flex-grow items-center justify-center'>
      <h1>Dashboard</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li> // Adapt according to your data structure
        ))}
      </ul>
    </main>
  );
}
