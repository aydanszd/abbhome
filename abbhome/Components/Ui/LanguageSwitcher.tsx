// components/LanguageSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    const languages = [
        { code: 'az', label: 'AZ', flag: '🇦🇿' },
        { code: 'en', label: 'EN', flag: '🇬🇧' },
        { code: 'ru', label: 'RU', flag: '🇷🇺' }
    ];

    return (
        <div className="flex gap-2">
            {languages.map((lang) => (
                <Link
                    key={lang.code}
                    href={pathname}
                    locale={lang.code}
                    className={`px-3 py-2 rounded-lg font-medium ${
                        locale === lang.code
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    {lang.flag} {lang.label}
                </Link>
            ))}
        </div>
    );
}