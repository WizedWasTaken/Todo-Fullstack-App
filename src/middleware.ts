// app/middleware.js or app/admin/middleware.js for scoped middleware
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

/*
 * Middleware for the app
 */
export async function middleware(req: any) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token: any = await getToken({ req, secret });

  // Dashboard route
  const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');
  if (isDashboardRoute) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // Admin routes
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  if (isAdminRoute) {
    if (!token || !(token as any).groups.includes('admin')) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
