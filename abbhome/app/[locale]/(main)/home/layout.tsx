import Header from "@/Layouts/RootLayout/Header";
import Footer from "@/Layouts/RootLayout/Footer";
import type { ReactNode } from "react";

export const revalidate = 3600;

export default function MainLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}