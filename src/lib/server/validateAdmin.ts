import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

const auth = async (req: any, next: any) => {
  console.log('Authenticating...');
  const token = await getToken({ req, secret });
  console.log('Token: ', token);

  if (!token) {
    return false;
  }

  // TODO: Is this the best way to handle this?

  if (
    (token as any)?.groups.includes('admin') ||
    (token as any)?.groups.includes('allPerms')
  ) {
    console.log('Admin or allPerms');
    return true;
  }

  return false;
};

export default auth;
