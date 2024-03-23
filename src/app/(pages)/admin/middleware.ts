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
  console.log('middleware');
  const { pathname } = req.nextUrl;

  // Skip middleware for non-page requests like static files
  if (pathname.includes('/_next')) {
    return NextResponse.next();
  }

  // Example condition: Check for a custom header
  const customHeader = req.headers.get('x-custom-header');
  if (!customHeader) {
    // Redirect to a sign-in page if the custom header is missing
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Continue with the request if the header is present
  return NextResponse.next();
}
