import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/server/dbConnect';
import Review from '@/lib/models/Review';
import { ReviewData } from '@/lib/types';

async function createReview(
  req: NextApiRequest,
  res: NextApiResponse<ReviewData | { message: string }>
) {
  switch (req.method) {
    case 'POST':
      return createNewReview(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function createNewReview(
  req: NextApiRequest,
  res: NextApiResponse<ReviewData | { message: string }>
) {
  await dbConnect();

  const { userId, rating, review } = req.body;

  try {
    const existingReview = await Review.findOne({ userId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: 'User has already written a review.' });
    }

    if (rating > 5) {
      return res.status(400).json({ message: 'Rating exceeds limit.' });
    }

    if (review.length > 1000) {
      return res.status(400).json({ message: 'Review length exceeds limit.' });
    }

    const newReview = await Review.create({
      userId,
      rating,
      review,
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review.' });
  }
}

export default createReview;
