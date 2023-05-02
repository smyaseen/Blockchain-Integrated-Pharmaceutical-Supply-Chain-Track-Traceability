// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';
import routeConfig from './routes/RouteConfig';

// This function can be marked `async` if using `await` inside
// eslint-disable-next-line consistent-return
export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request });

  let isLoggedIn = false;
  let role = '';

  if (session && session.id) {
    isLoggedIn = true;
    role = session.role as string;
  }
  const {
    nextUrl: { pathname },
  } = request;

  if (!routeConfig.public[pathname]) {
    if (isLoggedIn && !routeConfig[role][pathname]) {
      return NextResponse.redirect(
        new URL(routeConfig[role].default, request.url)
      );
    }

    if (!isLoggedIn && !routeConfig.auth[pathname]) {
      return NextResponse.redirect(
        new URL(routeConfig.public.default, request.url)
      );
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico|manifest|icon|static).*)',
  ],
};
