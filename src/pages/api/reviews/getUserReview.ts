import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/server/dbConnect';
import Review from '@/lib/models/Review';
import { ReviewData } from '@/lib/types';

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
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
}

export default getAllReviews;
