// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // Bütün dəstəklənən dillər
    locales: ['az', 'en', 'ru'],

    // Default dil
    defaultLocale: 'az',

    // Locale prefix strategy
    localePrefix: 'always' // URL-də həmişə /az, /en, /ru olacaq
});

// Navigation helpers
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);