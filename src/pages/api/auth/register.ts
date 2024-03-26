import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/utils/database/dbConnect';
import User from '@/lib/models/User';
import { UserData } from '@/lib/types';
import bcrypt from 'bcryptjs';

type Data =
  | { message: string }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, repeatPassword, firstName, lastName } = req.body;

  if (!email || !password || !repeatPassword || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (password !== repeatPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password', hashedPassword);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      image: '/public/images/default-profile.jpg',
      projects: [],
    });

    console.log('Register User:', user);

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
