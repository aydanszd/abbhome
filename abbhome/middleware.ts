// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: [
        // Skip all internal paths (_next, _vercel)
        '/((?!api|admin|_next/static|_next/image|_vercel|favicon.ico|.*\\..*|monitoring).*)',
        // Root
        '/',
        // Locale paths
        '/(aze|en|ru)/:path*'
    ]
};