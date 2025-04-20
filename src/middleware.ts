import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

export const locales = ['be', 'ru', 'en'] as const;
export const defaultLocale = 'be' as const;

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export async function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
