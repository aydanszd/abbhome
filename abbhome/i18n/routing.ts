// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['aze', 'en', 'ru'],
    defaultLocale: 'aze',
    localePrefix: 'always', // URL-də həmişə locale göstər
    localeDetection: true // Browser dilini detect et
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);