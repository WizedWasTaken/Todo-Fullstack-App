import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/server/dbConnect';
import Review from '@/lib/models/Review';
import User from '@/lib/models/User';
import { ReviewData, UserData } from '@/lib/types';
import { getToken } from 'next-auth/jwt';

function getAllReviews(
  req: NextApiRequest,
  res: NextApiResponse<ReviewData[] | { message: string }>
) {
  // TODO: lav det her lort
  switch (req.method) {
    case 'GET':
      return getReviews(req, res);
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// TAR ALLE REVIEWS FRA DATABASEN
async function getReviews(
  req: NextApiRequest,
  res: NextApiResponse<ReviewData[] | { message: string }>
) {
  await dbConnect();

  try {
    //   Skriv noget cool kode til at finde brugerens review...

    const author = await getToken({ req, secret: process.env.SECRET });
    if (!author) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const review = await Review.findOne({
      author: author.id,
    }).populate('author', 'name');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
}

export default getAllReviews;
