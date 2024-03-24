import { getSession } from 'next-auth/react';
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = getSession();
  console.log('session', session);
  // Admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // @ts-ignore
    // console.log('Signed in' + session.user.email);
  }
  //   return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/admin/dashboard',
};
