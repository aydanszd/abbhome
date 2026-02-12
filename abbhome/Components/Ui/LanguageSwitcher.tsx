// components/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

type Language = 'aze' | 'en' | 'ru';

export default function LanguageSwitcher() {
    const locale = useLocale() as Language;
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleLanguageChange = (lang: Language) => {
        if (locale === lang) return; // Eyni dildəsə, heç nə etmə

        startTransition(() => {
            // Cookie saxla (Next-intl üçün)
            document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000`;

            // UI üçün dil: aze -> az (backend sözləri üçün), digərləri eyni
            const uiLang = lang === 'aze' ? 'az' : lang;
            localStorage.setItem('language', uiLang);

            // Router ilə dəyiş - URL-də /aze, /en, /ru olacaq, scroll dəyişməsin
            router.replace(pathname, { locale: lang, scroll: false });
        });
    };

    const languages = [
        { code: 'aze', label: 'AZE', flag: '🇦🇿' },
        { code: 'en', label: 'EN', flag: '🇬🇧' },
        { code: 'ru', label: 'RU', flag: '🇷🇺' }
    ];

    return (
        <div className="flex gap-2 relative">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as Language)}
                    disabled={isPending || locale === lang.code}
                    className={`px-3 py-2 rounded-lg font-medium transition-all ${
                        locale === lang.code
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } ${
                        isPending ? 'opacity-50 cursor-not-allowed' : ''
                    } disabled:cursor-not-allowed`}
                >
                    {lang.flag} {lang.label}
                </button>
            ))}
            
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-lg">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}