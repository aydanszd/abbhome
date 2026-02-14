"use client"
import * as React from "react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/Ui/dropdown-menu"
import { ChevronDown, Headphones, User, Menu, X, Home } from 'lucide-react';
import { Fira_Sans, Inter } from 'next/font/google'
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const fira = Fira_Sans({
    subsets: ['latin'],
    weight: ['500'],
})

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
})

interface Translation {
    az: string;
    en: string;
    ru: string;
}

interface NavbarWord {
    _id: string;
    wordId: string;
    translations: Translation;
    description: string;
    isActive: boolean;
}

interface Product {
    href: string;
    labelKey: string;
}

type Language = 'az' | 'en' | 'ru';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [navbarWords, setNavbarWords] = React.useState<Record<string, Translation>>({});
    const [loading, setLoading] = React.useState(true);
    const [currentLang, setCurrentLang] = React.useState<Language>('az');
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    // URL-dəki locale-ə görə navbar dilini sinxron saxla
    React.useEffect(() => {
        if (locale === 'aze') {
            setCurrentLang('az');
        } else if (locale === 'en' || locale === 'ru') {
            setCurrentLang(locale as Language);
        }
    }, [locale]);

    React.useEffect(() => {
        const fetchNavbarWords = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/words`);
                if (!response.ok) throw new Error('Failed to fetch navbar words');
                
                const result = await response.json();
                
                let data: NavbarWord[];
                
                if (Array.isArray(result)) {
                    data = result;
                } else if (result.data && Array.isArray(result.data)) {
                    data = result.data;
                } else if (result.words && Array.isArray(result.words)) {
                    data = result.words;
                } else {
                    console.error('Unexpected response structure:', result);
                    throw new Error('Invalid response structure');
                }
                
                const wordsMap = data
                    .filter(item => item.wordId && item.wordId.startsWith('navbar_words_'))
                    .reduce((acc, item) => {
                        acc[item.wordId] = item.translations;
                        return acc;
                    }, {} as Record<string, Translation>);
                
                setNavbarWords(wordsMap);
            } catch (error) {
                console.error('Error fetching navbar words:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNavbarWords();
    }, []);

    const handleLanguageChange = (lang: Language) => {
        const routerLocale = lang === 'az' ? 'aze' : lang;
        setCurrentLang(lang);
        localStorage.setItem('language', lang);
        document.cookie = `NEXT_LOCALE=${routerLocale};path=/;max-age=31536000`;
        // Path-i dərhal yenilə ki, gecikmə hiss olunmasın
        const base = pathname && pathname !== '/' ? pathname : '/home';
        const newPath = `/${routerLocale}${base}`;
        if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', newPath);
        }
        React.startTransition(() => {
            router.replace(pathname, { locale: routerLocale, scroll: false });
        });
    };

    const getText = (key: string): string => {
        return navbarWords[key]?.[currentLang] || '';
    };

    const products: Product[] = [
        { href: "/hamsi", labelKey: 'navbar_words_hamisi' },
        { href: "/menzil-ve-evler", labelKey: 'navbar_words_menzil' },
        { href: "/partnyor-sirketler", labelKey: 'navbar_words_partnyor' },
        { href: "/torpaq-sahesi", labelKey: 'navbar_words_torpaq' },
        { href: "/ev-tikintisi", labelKey: 'navbar_words_tikinti' },
        { href: "/dovlet-ipotekasi", labelKey: 'navbar_words_dovlet' },
        { href: "/biznes-obyekti", labelKey: 'navbar_words_biznes' },
    ];

    const renderDropdownItems = () =>
        products.map((p) => (
            <DropdownMenuItem key={p.href}>
                <Link href={p.href} className="w-full">
                    {getText(p.labelKey)}
                </Link>
            </DropdownMenuItem>
        ));

    if (loading) {
        return (
            <nav className="w-full bg-white px-4 sm:px-6 py-7">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="w-full bg-white px-4 sm:px-6 py-7">
            <div className="max-w-6xl mx-auto flex items-center justify-baseline">
                <Link href="/" className="flex items-center">
                    <div className={`text-2xl sm:text-[28px] font-semibold w-37.5 h-10 flex ${fira.className}`}>
                        <span className="text-[#0057c2]">ABB</span>
                        <span className="text-[#3BA6DE] ml-2">Home</span>
                    </div>
                </Link>
                <div className="hidden lg:flex items-center gap-6 flex-1 ml-12">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white text-black hover:bg-gray-200 border border-gray-300 transition-colors outline-none focus:ring-1 focus:ring-gray-200">
                            <Home className="w-4 h-4 text-[#0057c2]" />
                            <span className={`${inter.className} font-medium text-[14px]`}>
                                {getText('navbar_words_ipotekamehsullai')}
                            </span>
                            <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {renderDropdownItems()}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link
                        href="/emlak-qiymetlendirme"
                        className={`text-gray-700 hover:text-[#0057c2] transition-colors font-medium text-[14px] ${inter.className}`}
                    >
                        {getText('navbar_words_emlakqiymetlendirme')}
                    </Link>
                    <Link
                        href="/emeliyyat"
                        className={`text-gray-700 hover:text-[#0057c2] transition-colors font-medium text-[14px] ${inter.className}`}
                    >
                        {getText('navbar_words_emeliyyat')}
                    </Link>
                </div>
                <div className="hidden lg:flex items-center gap-3">
                    {/* Language Selector */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleLanguageChange('az')}
                            className={`${inter.className} font-medium text-[14px] px-2 py-1 rounded transition-colors ${
                                currentLang === 'az' 
                                    ? 'text-[#0057c2] bg-gray-100' 
                                    : 'text-gray-600 hover:text-[#0057c2]'
                            }`}
                        >
                            AZ
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`${inter.className} font-medium text-[14px] px-2 py-1 rounded transition-colors ${
                                currentLang === 'en' 
                                    ? 'text-[#0057c2] bg-gray-100' 
                                    : 'text-gray-600 hover:text-[#0057c2]'
                            }`}
                        >
                            EN
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => handleLanguageChange('ru')}
                            className={`${inter.className} font-medium text-[14px] px-2 py-1 rounded transition-colors ${
                                currentLang === 'ru' 
                                    ? 'text-[#0057c2] bg-gray-100' 
                                    : 'text-gray-600 hover:text-[#0057c2]'
                            }`}
                        >
                            RU
                        </button>
                    </div>

                    <button className="p-2 w-10 h-10 rounded-lg bg-[#F2F2F7] hover:bg-gray-300 transition-colors">
                        <Headphones className="w-5 h-5 mx-auto text-gray-700" />
                    </button>
                    <Link
                        href="/kabinet"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
                    >
                        <User className="w-5 h-5 text-gray-600" />
                        <span className={`${inter.className} font-medium text-[14px]`}>
                            {getText('navbar_words_kabinet')}
                        </span>
                    </Link>
                </div>
                <button
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6 text-gray-600" />
                    ) : (
                        <Menu className="w-6 h-6 text-gray-600" />
                    )}
                </button>
            </div>
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-200 mt-3 pt-3 pb-4">
                    <div className="flex flex-col gap-3">
                        {/* Language Selector Mobile */}
                        <div className="flex items-center justify-center gap-2 px-4 py-2.5">
                            <button
                                onClick={() => handleLanguageChange('az')}
                                className={`${inter.className} font-medium text-[14px] px-3 py-1.5 rounded transition-colors ${
                                    currentLang === 'az' 
                                        ? 'text-[#0057c2] bg-gray-100' 
                                        : 'text-gray-600 hover:text-[#0057c2]'
                                }`}
                            >
                                AZ
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={() => handleLanguageChange('en')}
                                className={`${inter.className} font-medium text-[14px] px-3 py-1.5 rounded transition-colors ${
                                    currentLang === 'en' 
                                        ? 'text-[#0057c2] bg-gray-100' 
                                        : 'text-gray-600 hover:text-[#0057c2]'
                                }`}
                            >
                                EN
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={() => handleLanguageChange('ru')}
                                className={`${inter.className} font-medium text-[14px] px-3 py-1.5 rounded transition-colors ${
                                    currentLang === 'ru' 
                                        ? 'text-[#0057c2] bg-gray-100' 
                                        : 'text-gray-600 hover:text-[#0057c2]'
                                }`}
                            >
                                RU
                            </button>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-colors w-full">
                                <span className="font-medium">
                                    {getText('navbar_words_ipotekamehsullai')}
                                </span>
                                <ChevronDown className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                                {renderDropdownItems()}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link
                            href="/emlak-qiymetlendirme"
                            className="px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-[15px]"
                        >
                            {getText('navbar_words_emlakqiymetlendirme')}
                        </Link>
                        <Link
                            href="/emeliyyat"
                            className="px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-[15px]"
                        >
                            {getText('navbar_words_emeliyyat')}
                        </Link>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full">
                            <Headphones className="w-5 h-5 text-gray-600" />
                            <span className="text-[15px]">{getText('navbar_words_destek')}</span>
                        </button>
                        <Link
                            href="/kabinet"
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <User className="w-5 h-5 text-gray-600" />
                            <span className="text-[15px]">{getText('navbar_words_kabinet')}</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}