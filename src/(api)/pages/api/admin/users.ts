import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/database/dbConnect';
import User from '@/lib/models/User';
import { UserData } from '@/lib/types';

import validate from '@/lib/server/validateAdmin';

// Assuming validate is adjusted to work with promises for this example
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData[] | { message: string }>
) {
  await dbConnect();

  try {
    if (!(await validate(req, res))) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('Validate Passed');

    switch (req.method) {
      case 'GET':
        const users = await User.find({});
        res.status(200).json(users);
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
