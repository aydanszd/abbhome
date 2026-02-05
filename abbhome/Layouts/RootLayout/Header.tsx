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
const fira = Fira_Sans({
    subsets: ['latin'],
    weight: ['500'],
})

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
})
const products = [
    { href: "/hamsi", label: "Hamısı" },
    { href: "/menzil-ve-evler", label: "Mənzil və həyət evləri" },
    { href: "/partnyor-sirketler", label: "Partnyor şirkətlər" },
    { href: "/torpaq-sahesi", label: "Torpaq sahəsi" },
    { href: "/ev-tikintisi", label: "Ev tikintisi və təmir" },
    { href: "/dovlet-ipotekasi", label: "Dövlət ipotekası" },
    { href: "/biznes-obyekti", label: "Biznes obyekti" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const renderDropdownItems = () =>
        products.map((p) => (
            <DropdownMenuItem key={p.href}>
                <Link href={p.href} className="w-full">
                    {p.label}
                </Link>
            </DropdownMenuItem>
        ));

    return (
        <nav className="w-full bg-white  px-4 sm:px-6 py-7">
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
                            <span className={`${inter.className} font-medium text-[14px]`}>İpoteka məhsulları</span>
                            <ChevronDown className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {renderDropdownItems()}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link
                        href="/emeliyyat"
                        className={`text-gray-700 hover:text-[#0057c2] transition-colors font-medium text-[14px] ${inter.className}`}
                    >
                        Əməliyyatı qiymətləndirin
                    </Link>
                </div>
                <div className="hidden lg:flex items-center gap-3">
                    <button className="p-2 w-10 h-10 rounded-lg bg-[#F2F2F7] transition-colors">
                        <Headphones className="w-5 h-5 mx-auto  text-gray-700" />
                    </button>
                    <Link
                        href="/kabinet"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
                    >
                        <User className="w-5 h-5 text-gray-600" />
                        <span className={`${inter.className} font-medium text-[14px]`}>
                            İpoteka kabineti
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
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white transition-colors w-full">
                                <span className="font-medium">İpoteka məhsulları</span>
                                <ChevronDown className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                                {renderDropdownItems()}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link
                            href="/emeliyyat"
                            className="px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-[15px]"
                        >
                            Əməliyyatı qiymətləndirin
                        </Link>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full">
                            <Headphones className="w-5 h-5 text-gray-600" />
                            <span className="text-[15px]">Dəstək</span>
                        </button>
                        <Link
                            href="/kabinet"
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <User className="w-5 h-5 text-gray-600" />
                            <span className="text-[15px]">İpoteka kabineti</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
