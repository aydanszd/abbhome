'use client';
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex-1 w-full">
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;