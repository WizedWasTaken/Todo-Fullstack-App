'use client';

import CreatedReviewAlert from '@/components/alert/createdReviewAlert';
import { cn } from '@/lib/utils/classNames';
import { Label } from '@/components/ui-library/label';
import { Input } from '@/components/ui-library/input';
import { useSession } from 'next-auth/react';
import { ReviewData } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui-library/button';

export default function Review() {
  const { data: session } = useSession();
  const [review, setReview] = useState<ReviewData | null>(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      const reviewData = await fetchReview();
      setReview(reviewData);
    };

    fetchReviewData();
  }, []);
  return (
    <main className='flex flex-col flex-grow'>
      <CreatedReviewAlert />
      <h1>test</h1>
      <form>
        <LabelInputContainer className='md:mb-2'>
          <Label htmlFor='email'>Anmeldelse</Label>
          <Input
            name='content'
            id='content'
            placeholder='Din anmeldelse her'
            type='text'
          />
        </LabelInputContainer>
        <Button
          className={`w-full ${
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
    </main>
  );
}

async function fetchReview() {
  try {
    const response = await fetch('/api/reviews/getUserReview');
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
