/**
 * 404!
 * @returns HTML for the 404 page
 */
export default function Custom404() {
  return (
    <main className='flex flex-col flex-grow items-center justify-center'>
      <h1 className='text-3xl text-red-600'>404 - Error</h1>
      <h3>Siden blev ikke fundet 😒</h3>
    </main>
  );
}
