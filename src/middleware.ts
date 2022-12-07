// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { store } from './store/store';
import routeConfig from './routes/RouteConfig';

// This function can be marked `async` if using `await` inside
// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  const {
    auth: { isLoggedIn, role },
  } = store.getState();

  const {
    nextUrl: { pathname },
  } = request;

  if (isLoggedIn && !routeConfig[role][pathname]) {
    return NextResponse.redirect(
      new URL(routeConfig[role].default, request.url)
    );
  }

  if (!isLoggedIn && !routeConfig.auth[pathname]) {
    return NextResponse.redirect(
      new URL(routeConfig.auth.default, request.url)
    );
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
    '/((?!api|_next/static|favicon.ico|manifest|icon).*)',
  ],
};
