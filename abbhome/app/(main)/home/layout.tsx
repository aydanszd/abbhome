import Header from "@/Layouts/RootLayout/Header";
import Footer from "@/Layouts/RootLayout/Footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}