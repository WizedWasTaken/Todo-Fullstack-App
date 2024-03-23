import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.SECRET;

// export async function middleware(req: NextRequest) {
//   const url = req.nextUrl.clone();

//   if (!url.pathname.startsWith('/admin')) {
//     return;
//   }

//   const session = await getToken({ req, secret });

//   if (
//     !session ||
//     !session.roles ||
//     !(session.roles as string[]).includes('admin')
//   ) {
//     url.pathname = '/register';
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

export default function middleware(req: NextRequest) {
  console.log('Middleware is running');
  // Perform a simple action, like logging or redirecting
  // return NextResponse.redirect('/some-path');
  return NextResponse.next();
}
