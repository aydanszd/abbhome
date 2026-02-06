'use client';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './RootLayout/Header';
import Footer from './RootLayout/Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <div className="flex flex-col">
            {!isAdminRoute && <Header />}
            <main className="flex-1 w-full">
                {children}
            </main>
            {!isAdminRoute && <Footer />}
        </div>
    );
};

export default Layout;