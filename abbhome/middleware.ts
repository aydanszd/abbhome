// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: [
        // Admin route-unu exclude et
        '/((?!api|admin|_next|_vercel|.*\\..*).*)',
        '/',
        '/(az|en|ru)/:path*'
    ]
};