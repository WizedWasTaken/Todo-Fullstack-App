import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forside | Todo App',
};

/**
 * Frontpage of the app
 * @returns HTML for the frontpage
 */
export default function Home() {
  return (
    <main className='flex flex-grow items-center justify-center'>
      <h1>Frontpage</h1>
    </main>
  );
}
