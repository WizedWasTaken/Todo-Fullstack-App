'use client';
import { useEffect, useState } from 'react';

function FetchDataComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Call the API endpoint
    fetch('/api/reviews/getAllUsers')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an object with a 'users' field
        setUsers(data.users);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
      });
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        <ul>
          {users.map((user: { name: string; email: string }, index: number) => (
            <li key={index}>
              {user.name} - {user.email}
            </li> // Assuming users have 'name' and 'email'
          ))}
        </ul>
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}

export default FetchDataComponent;
