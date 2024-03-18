import { NextResponse } from 'next/server';

export default async function middleware(request: { url: string | URL }) {
  const { pathname } = new URL(request.url);

  const userIsAuthenticated = checkIfUserIsAuthenticated();

  console.log('userIsAuthenticated', userIsAuthenticated, pathname);
  if (!userIsAuthenticated && pathname.startsWith('/admin')) {
    return new Response('Unauthorized', {
      status: 401,
      headers: { Location: '/login' },
    });
  }

  return NextResponse.next();
}

function checkIfUserIsAuthenticated() {
  return false;
}
