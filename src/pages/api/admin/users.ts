// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/database/dbConnect';
import User from '@/lib/models/User';
import { UserData } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData[] | { message: string }>
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users.' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
