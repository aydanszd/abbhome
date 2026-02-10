// components/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

type Language = 'aze' | 'en' | 'ru';

export default function LanguageSwitcher() {
    const locale = useLocale() as Language;
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (lang: Language) => {
        // Cookie saxla (Next-intl üçün)
        document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000`;

        // UI üçün dil: aze -> az (backend sözləri üçün), digərləri eyni
        const uiLang = lang === 'aze' ? 'az' : lang;
        localStorage.setItem('language', uiLang);

        // Router ilə dəyiş - URL-də /aze, /en, /ru olacaq
        router.replace(pathname, { locale: lang });
    };

    const languages = [
        { code: 'aze', label: 'AZE', flag: '🇦🇿' },
        { code: 'en', label: 'EN', flag: '🇬🇧' },
        { code: 'ru', label: 'RU', flag: '🇷🇺' }
    ];

    return (
        <div className="flex gap-2">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as Language)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                        locale === lang.code
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {lang.flag} {lang.label}
                </button>
            ))}
        </div>
    );
}