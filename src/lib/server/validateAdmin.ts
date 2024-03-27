import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

const auth = async (req: any, next: any) => {
  const token = await getToken({ req, secret });

  if (!token) {
    return false;
  }

  // TODO: Is this the best way to handle this?
  if (
    (token as any)?.groups.includes('admin') ||
    (token as any)?.groups.includes('allPerms')
  ) {
    return true;
  }

  return false;
};

export default auth;
