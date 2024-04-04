import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/server/dbConnect';
import Review from '@/lib/models/Review';
import User from '@/lib/models/User';
import { ReviewData } from '@/lib/types';
import { getToken } from 'next-auth/jwt';

async function createReview(
  req: NextApiRequest,
  res: NextApiResponse<ReviewData | { message: string }>
) {
  switch (req.method) {
    case 'POST':
      return createNewReview(req, res);
    case 'PUT':
      return updateReview(req, res);
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

  const { content, email, rating } = req.body;

  try {
    const existingReview = await Review.findOne({ email: email });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: 'User has already written a review.' });
    }

    if (rating > 5) {
      return res.status(400).json({ message: 'Rating exceeds limit.' });
    }

    if (content.length > 1000) {
      return res.status(400).json({ message: 'Review length exceeds limit.' });
    }

    const author = await User.findOne({ email });

    const newReview = await Review.create({
      author,
      rating,
      content,
    });

    newReview.save();

    return res.status(201).json({ message: 'Review created.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review.' });
  }
}

async function updateReview(
  req: NextApiRequest,
  res: NextApiResponse<ReviewData | { message: string }>
) {
  await dbConnect();

  const { content, rating } = req.body;

  const author = await getToken({ req, secret: process.env.SECRET });
  if (!author) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const review = await Review.findOneAndUpdate(
      { author: author.id },
      { content, rating },
      { new: true }
    );

    return res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review.' });
  }
}

export default createReview;
