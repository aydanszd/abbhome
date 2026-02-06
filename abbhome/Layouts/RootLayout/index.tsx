'use client';
import React, { ReactNode } from 'react';
import Header from './Header';
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
        </div>
    );
};

export default Layout;