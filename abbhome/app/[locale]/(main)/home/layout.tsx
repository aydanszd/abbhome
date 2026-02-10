import Header from "@/Layouts/RootLayout/Header";
import Footer from "@/Layouts/RootLayout/Footer";
import type { ReactNode } from "react";

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