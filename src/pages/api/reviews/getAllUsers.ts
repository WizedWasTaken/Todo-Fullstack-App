import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';

import User from '@/lib/models/User';

/**
 * Get all users
 * @param req required
 * @param res response
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('req.method', req.method);
  const session = await getSession({ req });
  if (!session) {
    console.log("Unauthorised")
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  if (req.method === 'GET') {
    console.log("Get")
    if (!process.env.MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      );
    }
    mongoose.connect(process.env.MONGODB_URI as string);
    const users = await User.find({}).exec();
    console.log("Finding")
    console.log('users', users);
    res.status(200).json({ users });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
