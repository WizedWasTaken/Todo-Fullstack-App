import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

const auth = async (req: any, res: any, next: any) => {
  const token = await getToken({ req, secret });
  if (token) {
    console.log('Token: ', token);
    req.user = token;
    next();
  } else {
    console.log('Unauthorized');
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default auth;
