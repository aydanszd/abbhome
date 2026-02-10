'use client'

import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

interface Translation {
    az: string;
    en: string;
    ru: string;
}

interface Word {
    _id: string;
    wordId: string;
    translations: Translation;
    description: string;
    isActive: boolean;
}

type Language = 'az' | 'en' | 'ru';

export default function Footer() {
    const [words, setWords] = useState<Record<string, Translation>>({});
    const [currentLang, setCurrentLang] = useState<Language>('az');

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && ['az', 'en', 'ru'].includes(savedLang)) {
            setCurrentLang(savedLang);
        }

        const handleLanguageChange = (e: CustomEvent) => {
            setCurrentLang(e.detail as Language);
        };

        window.addEventListener('languageChange', handleLanguageChange as EventListener);
        return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    }, []);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/words`);
                if (!response.ok) throw new Error('Failed to fetch words');
                
                const result = await response.json();
                
                let data: Word[];
                
                if (Array.isArray(result)) {
                    data = result;
                } else if (result.data && Array.isArray(result.data)) {
                    data = result.data;
                } else if (result.words && Array.isArray(result.words)) {
                    data = result.words;
                } else {
                    throw new Error('Invalid response structure');
                }
                
                const wordsMap = data
                    .filter(item => item.wordId && item.wordId.startsWith('footer_'))
                    .reduce((acc, item) => {
                        acc[item.wordId] = item.translations;
                        return acc;
                    }, {} as Record<string, Translation>);
                
                setWords(wordsMap);
            } catch (error) {
                console.error('Error fetching footer words:', error);
            }
        };

        fetchWords();
    }, []);

    const getText = (key: string): string => {
        return words[key]?.[currentLang] || '';
    };

    return (
        <footer className={`bg-[#F2F2F7] pt-16 pb-8 mt-16 ${inter.className}`}>
            <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h3 className="text-gray-900 font-bold text-[16px] mb-6">
                            {getText('footer_domestic_mortgage')}
                        </h3>
                        <ul className="space-y-3 text-[14px]">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_apartment_house_mortgage')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_partner_companies_mortgage')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_land_mortgage')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_construction_mortgage')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_mortgage_deposit')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_business_property_mortgage')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_secured_consumer_loan')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_renovation_loan')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-gray-900 font-bold text-[16px] mb-6">
                            {getText('footer_government_mortgage')}
                        </h3>
                        <ul className="space-y-3 text-[14px]">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_government_mortgage_regular')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_government_mortgage_preferential')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_mida_preferential_mortgage')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-gray-900 font-bold text-[16px] mb-6">
                            {getText('footer_other_sections')}
                        </h3>
                        <ul className="space-y-3 text-[14px]">
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_mortgage_branches')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_tamkart_platinum')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_cashback')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_feedback')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {getText('footer_online_queue')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                    <Link
                        href="#"
                        className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </Link>
                    <Link
                        href="#"
                        className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </Link>
                    <Link
                        href="#"
                        className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                    </Link>
                    <Link
                        href="#"
                        className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </Link>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>{getText('footer_copyright')}</p>
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 18h6M4 6h16M6 10h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2z"
                            />
                        </svg>
                        <span className="text-gray-900 font-medium">937</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}