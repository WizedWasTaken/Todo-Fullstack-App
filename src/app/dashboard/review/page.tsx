'use client';

import CreatedReviewAlert from '@/components/alert/createdReviewAlert';
import { cn } from '@/lib/utils/classNames';
import { Label } from '@/components/ui-library/label';
import { TextArea } from '@/components/ui-library/input';
import { useSession } from 'next-auth/react';
import { ReviewData } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui-library/button';
import React from 'react';
import { redirect, usePathname } from 'next/navigation';

export default function Review() {
  const { data: session } = useSession();
  const [review, setReview] = useState<ReviewData | null>(null);
  const [currentRating, setCurrentRating] = useState(5);

  /*
   * Fetches the review data and sets the review state
   */
  const fetchAndSetReviewData = async () => {
    const reviewData = await fetchReview();
    if (reviewData) {
      setReview(reviewData);
      setCurrentRating(reviewData.rating);
    }
  };

  /*
   * Handles the form submission
   * @param e Form event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const content = form.get('content') as string;

    const method = review?.content ? 'PUT' : 'POST';

    const response = await fetch('/api/reviews/createReview', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        email: session?.user?.email, // Assuming session is defined elsewhere
        rating: currentRating,
      }),
    });

    if (response.ok) {
      alert('Anmeldelse oprettet');
      await fetchAndSetReviewData();
    } else {
      alert('Anmeldelse kunne ikke oprettes');
    }
  };

  /*
   * Fetches the review data on component mount
   */
  useEffect(() => {
    fetchAndSetReviewData();
  }, []);

  return (
    <main className='flex flex-col flex-grow space-y-5'>
      <h1 className='text-2xl text-center'>Opdater din anmeldelse</h1>
      <form
        onSubmit={handleSubmit}
        className='flex space-y-5 flex-col'
      >
        <LabelInputContainer className='md:mb-2'>
          <Label htmlFor='email'>Anmeldelse</Label>
          <TextArea
            name='content'
            id='content'
            placeholder='Din anmeldelse her'
            defaultValue={review?.content}
          />
        </LabelInputContainer>
        <div className='flex justify-center space-x-2'>
          {[1, 2, 3, 4, 5].map((rating) => (
            <React.Fragment key={rating}>
              <input
                type='radio'
                name='rating'
                className='hidden'
                value={rating}
                id={`star${rating}`}
                checked={rating === currentRating}
                onChange={() => setCurrentRating(rating)}
              />
              <label htmlFor={`star${rating}`}></label>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-6 w-6 ${
                  rating <= currentRating ? 'text-yellow-500' : 'text-gray-500'
                }`}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                onClick={() => setCurrentRating(rating)}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 2l3.09 6.31L22 9.3l-5 4.88 1.18 6.87L12 17.77l-6.18 3.29L7 14.18l-5-4.88 6.91-.99L12 2z'
                />
              </svg>
            </React.Fragment>
          ))}
        </div>
        <Button
          className={`w-full text-white ${
            review == null
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
          type='submit'
        >
          {review == null ? 'Opret anmeldelse' : 'Gem anmeldelse'}
          <BottomGradient />
        </Button>
      </form>
      {review && (
        <Button
          className='w-full bg-red-500 hover:bg-red-600 text-white'
          onClick={async () => {
            const response = await fetch('/api/reviews/deleteReview', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: session?.user?.email,
              }),
            });

            if (response.ok) {
              alert('Anmeldelse slettet');
              setReview(null);
            } else {
              alert('Anmeldelse kunne ikke slettes');
            }
          }}
        >
          Slet anmeldelse
          <BottomGradient />
        </Button>
      )}
      {review && <CreatedReviewAlert />}
    </main>
  );
}

async function fetchReview() {
  try {
    const response = await fetch('/api/reviews/getUserReview');
    if (!response.ok) return;
    const data = await response.json();
    return data;
  } catch (error) {
    return;
  }
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
