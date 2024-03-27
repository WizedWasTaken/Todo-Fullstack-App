import { Metadata } from 'next';

// Components
import { FrontpageCards } from '@/lib/utils/cards';
import PriceCards from '@/components/non-reusable/priceCards';
import { HoverEffect } from '@/components/ui-library/card-hover-effect';
import Reviews from '@/components/non-reusable/frontpageReviews';

export const metadata: Metadata = {
  title: 'Forside | Todo App',
};

/**
 * Frontpage of the app
 * @returns HTML for the frontpage
 */
export default function Home() {
  return (
    <main className='flex flex-col flex-grow items-center justify-center container mx-auto gap-20 my-20'>
      <section className='flex w-full justify-center items-center'>
        <div>
          <p className='text-center text-1xl font-semibold'>Velkommen til</p>
          <h1 className='text-center text-3xl m-4 font-bold antialiased'>
            Todo App
          </h1>
          <p className='text-center'>
            Hjemmesiden der gør planlægning af store software projekter til en
            leg.
          </p>
        </div>
      </section>
      <section className='flex w-full flex-col justify-center items-center'>
        <h2 className='text-2xl font-semibold'>Funktioner</h2>
        <HoverEffect items={FrontpageCards} />
      </section>
      <section className='w-screen flex flex-col justify-center items-center'>
        <h2 className='text-2xl font-semibold'>Hvad vores brugere siger</h2>
        <Reviews />
      </section>
      <section className='flex w-full flex-col justify-center items-center'>
        <h2 className='text-2xl font-semibold'>Priser</h2>
        <PriceCards />
      </section>
    </main>
  );
}
