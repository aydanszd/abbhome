// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: [
        // Bütün route-ları tut, ancaq static faylları yox
        '/((?!api|_next|_vercel|.*\\..*).*)',
        '/',
        '/(az|en|ru)/:path*'
    ]
};