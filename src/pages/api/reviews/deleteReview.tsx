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
    case 'DELETE':
      return deleteReview(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function deleteReview(
  req: NextApiRequest,
  res: NextApiResponse<ReviewData | { message: string }>
) {
  await dbConnect();

  const { email } = req.body;

  try {
    const author = await User.findOne({
      email: email,
    });

    if (!author) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const review = await Review.findOneAndDelete({ author: author._id });

    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    return res.status(200).json({ message: 'Review deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review.' });
  }
}

export default deleteReview;
