// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // Bütün dəstəklənən dillər
    locales: ['aze', 'en', 'ru'],

    // Default dil
    defaultLocale: 'aze',

    // Locale prefix strategy
    // URL-də həmişə /aze, /en, /ru olacaq
    localePrefix: 'always'
});

// Navigation helpers
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);