// app/dashboard/+page.server.ts

export async function loader() {
  const res = await fetch(`http://localhost:3000/api/reviews/getAllUsers`);
  const data = await res.json();
  return data; // This will be the props for your page component
}
