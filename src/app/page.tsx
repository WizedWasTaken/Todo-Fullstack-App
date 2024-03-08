import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forside | Todo App',
};

// TODO: Lav et bedre design, gør det mere interaktivt. Overvej om dark mode er vejen frem?
// White mode var planen fuldt ud, men tror vi kører den med 100% dark mode. Mange af farverne fungere alligevel.

/**
 * Frontpage of the app
 * @returns HTML for the frontpage
 */
export default function Home() {
  return (
    <main className='flex flex-col flex-grow items-center justify-center container mx-auto'>
      <section className='flex w-full justify-center items-center border-4'>
        <div>
          <h2 className='text-center text-1xl'>Velkommen til</h2>
          <h1 className='text-center text-3xl font-semibold antialiased'>
            Todo App
          </h1>
          <p className='mt-5'>
            Hjemmesiden der gør planlægning af store software projekter til en
            leg.
          </p>
        </div>
      </section>
    </main>
  );
}
