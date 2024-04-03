"use client";

// Imports
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui-library/infinite-moving-cards";
import { ReviewData } from "@/lib/types";

/*
 * Reviews component
 * Component fetches reviews from the API and displays them in a moving card carousel
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
      direction='left'
      speed='fast'
      pauseOnHover={false}
      items={reviews}
      className="py-10 w-full overflow-hidden"
    />
  );
}

/*
 * Fetches reviews from the API
 * @returns Array of reviews
 */
async function fetchReviews() {
  try {
    const response = await fetch("/api/reviews/getReviews");
    const data = await response.json();
    if (!data) return;
    // TODO: Uses UserID currently. Fix this to use the actual name of the user
    return data.map((review: ReviewData) => ({
      title: "Kunde",
      quote: review.content,
      name: review.author.name,
      rating: review.rating,
    }));
  } catch (error) {
    return;
  }
}
