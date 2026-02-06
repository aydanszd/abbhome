import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

interface Company {
    id: number;
    name: string;
    logo: string;
    properties: number;
    likes: number;
}

const companies: Company[] = [
    {
        id: 1,
        name: 'Kristal',
        logo: 'https://cdn.abbhome.az/c9a25d791c0b3ebd948cf114ce3638acdb261741_bf0bcb1346.jpg',
        properties: 1544,
        likes: 7,
    },
    {
        id: 2,
        name: 'Ganja Park City',
        logo: 'https://cdn.abbhome.az/thumbnail_New_Project_d1f96d7780_f408bb75ce.webp',
        properties: 2027,
        likes: 1,
    },
    {
        id: 3,
        name: 'MAYAK RESIDENCE',
        logo: 'https://cdn.abbhome.az/thumbnail_Mayak_logo_original_525fc83cbf_a714a20b4f.webp',
        properties: 4554,
        likes: 0,
    },
    {
        id: 4,
        name: 'SEA BREEZE Resort',
        logo: 'https://cdn.abbhome.az/Sea_Breeze_logo_a052c57192.webp',
        properties: 840,
        likes: 3,
    },
    {
        id: 5,
        name: 'Melissa Group',
        logo: 'https://cdn.abbhome.az/melisa_logo_3ca1835227.webp',
        properties: 3939,
        likes: 1,
    },
    {
        id: 6,
        name: 'Avant Group',
        logo: 'https://cdn.abbhome.az/Avant_Group_Logo_1_0f56f0c66f.svg',
        properties: 241,
        likes: 1,
    },
];

export default function PartnerCompanies() {
    return (
        <section className={`py-12 px-4 sm:px-6 lg:px-8 ${inter.className}`}>
            <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Partnyor tikinti şirkətləri
                    </h2>
                    <Link
                        href="/partners"
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
                    >
                        Daha çox
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((company) => (
                        <div
                            key={company.id}
                            className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group h-[208px] flex flex-col justify-between border border-gray-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-transparent group-hover:border-blue-500 transition-colors">
                                    <Image
                                        src={company.logo}
                                        alt={company.name}
                                        width={64}
                                        height={64}
                                        className="object-contain w-16 h-16 rounded-xl"
                                    />
                                </div>
                                <h3 className="font-bold text-gray-900 text-xl">
                                    {company.name}
                                </h3>
                            </div>
                            <div className="flex items-center gap-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-900 font-semibold text-lg">*{company.properties}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-900 font-semibold text-lg">{company.likes} Layihə</span>
                                </div>
                            </div>
                            
                        </div>
                        
                    ))}
                </div>
                
            </div>
        </section>
    );
}