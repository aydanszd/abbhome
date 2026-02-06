'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [language, setLanguage] = useState<'en' | 'az'>('en');
    const pathname = usePathname();

    const translations = {
        en: {
            dashboard: 'Dashboard',
            products: 'Products',
            languages: 'Languages',
        },
        az: {
            dashboard: 'İdarə Paneli',
            products: 'Məhsullar',
            languages: 'Dillər',
        }
    };

    const t = translations[language];

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="hidden md:flex flex-col w-64 bg-gray-800">
                <div className="flex items-center justify-center h-16 bg-gray-900">
                    <span className="text-white font-bold uppercase">ABB Home</span>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <nav className="flex-1 px-2 py-4 bg-gray-800">
                        <Link 
                            href="/admin/dashboard" 
                            className={`flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 rounded ${
                                isActive('/admin/dashboard') ? 'bg-gray-700' : ''
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {t.dashboard}
                        </Link>
                        
                        <Link 
                            href="/admin/Productspage" 
                            className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded ${
                                isActive('/admin/Productspage') ? 'bg-gray-700' : ''
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                            {t.products}
                        </Link>

                        <Link 
                            href="/admin/Languagespage" 
                            className={`flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 rounded ${
                                isActive('/admin/Languagespage') ? 'bg-gray-700' : ''
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                                />
                            </svg>
                            {t.languages}
                        </Link>
                    </nav>
                </div>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}