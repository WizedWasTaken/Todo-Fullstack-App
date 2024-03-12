'use client';

import { useEffect, useState } from 'react';

async function getUserData() {
  const response = await fetch('/api/reviews/getAllUsers');
  const data = await response.json();
  return data;
}

export default function Dashboard() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData().then((data) => {
      console.log('Data:', data.users);
      if (Array.isArray(data.users)) {
        setUserData(data.users);
      } else {
        console.error('Data.users is not an array:', data);
      }
    });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <table className='table-auto mx-5'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Name</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Provider</th>
            <th className='px-4 py-2'>Image</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td className='border px-4 py-2'>{user.name}</td>
              <td className='border px-4 py-2'>{user.email}</td>
              <td className='border px-4 py-2'>{user.provider}</td>
              <td className='border px-4 py-2'>
                <img
                  className='w-10 h-10 rounded-full'
                  src={user.image || '/images/default-profile.png'}
                  alt=''
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
