'use client';

import React, { useEffect, useState } from 'react';
import { InfiniteMovingCards } from '@/components/ui-library/infinite-moving-cards';
import { ReviewData } from '@/lib/types';

/**
 *
 * @returns HTML and logic for the reviews component
 */
export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviewsData = async () => {
      const reviewsData = await fetchReviews();
      setReviews(reviewsData);
    };

    fetchReviewsData();
  }, []);

  return (
    <InfiniteMovingCards
      direction='right'
      speed='fast'
      pauseOnHover={false}
      items={reviews}
      className='py-10 w-full overflow-hidden'
    />
  );
}

/**
 *
 * @returns an array of reviews
 */
async function fetchReviews() {
  try {
    const response = await fetch('/api/reviews/getReviews');
    const data = await response.json();
    // TODO: Uses UserID currently. Fix this to use the actual name of the user
    return data.map((review: ReviewData) => ({
      title: 'Kunde',
      quote: review.review,
      name: review.userId,
    }));
  } catch (error) {
    return;
  }
}
