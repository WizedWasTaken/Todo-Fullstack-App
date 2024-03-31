// mark as client component
'use client';

/**
 *
 * @returns HTML for the dashboard page
 */
export default function Dashboard() {
    return (
      <div className='flex h-full w-full flex-col justify-center items-center'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <p className='text-center'>
          Velkommen til din dashboard. Her kan du se en oversigt over dine opgaver
          og projekter.
        </p>
      </div>
    );
  }