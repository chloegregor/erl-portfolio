import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

// This middleware redirects requests without a locale to the default locale (e.g., 'en')
export function proxy(request: NextRequest) {

  const {pathname} = request.nextUrl;
  // Check if the pathname starts with a locale (e.g., /en, /fr)
  const localePattern = /^\/(en|fr)(\/|$)/;
  const adminPattern = /^\/admin(\/|$)/;

  if (!localePattern.test(pathname)) {
    // If no locale is present, redirect to the default locale
    const url = request.nextUrl.clone();
    url.pathname = `/fr`;
    return NextResponse.redirect(url);
  }

  // If a locale is present, continue with the request
  return NextResponse.next();
}

// Specify the paths that should be matched by this middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|admin|sign-up|sign-in).*)'],
};
