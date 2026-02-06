import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
})

export default function MortgageLoans() {
    return (
        <div className={`min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 ${inter.className}`}>
            <div className="max-w-[1200px] mx-auto space-y-8">
                <div className="bg-white overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[20px] p-16 flex items-center justify-center w-full md:w-[416px] h-[416px] flex-shrink-0">
                            <div className="relative w-[416px] h-[416px]">
                                <Image
                                    src="https://cdn.abbhome.az/yard_and_garden_1_a5bcdcf488.webp"
                                    alt="House with keys"
                                    width={280}
                                    height={280}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex-1 py-4">
                            <h2 className="text-[32px] font-medium text-gray-900 mb-5 leading-tight">
                                Mənzil, fərdi yaşayış və bağ evləri üçün ipoteka krediti
                            </h2>

                            <p className="text-gray-600 text-[16px] leading-relaxed mb-8">
                                Rəsmi gəliri olan müştərilərə yeni tikililərdə çıxarışlı və çıxarışsız mənzil, köhnə tikililərdə isə çıxarışlı mənzil, bağ və həyət evləri almaq imkanı təqdim edən daxili ipoteka kreditidir.
                            </p>
                            <div className="grid grid-cols-4 gap-8 mb-8">
                                <div className="space-y-1">
                                    <div className="text-[20px] font-semibold text-gray-900 whitespace-nowrap">
                                        500,000 AZN
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Maksimal məbləğ
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-semibold text-gray-900 whitespace-nowrap">
                                        12%-dən
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Minimal illik faiz
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-semibold text-gray-900 whitespace-nowrap">
                                        25 ilədək
                                    </div>
                                    <div className="text-[16px] text-gray-500 whitespace-nowrap">
                                        Maksimal müddət
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[22px] font-semibold text-gray-900 whitespace-nowrap">
                                        15%-dən
                                    </div>
                                    <div className="text-[13px] text-gray-500">
                                        Minimal ilkin ödəniş
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-[#1B63ED] hover:bg-blue-700 text-white font-medium px-7 py-3 rounded-lg transition-all duration-200">
                                    Müraciət edin
                                </button>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-7 py-3 rounded-lg transition-all duration-200">
                                    Daha ətraflı
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-200 my-10"></div>
                <div className="bg-white overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative bg-gradient-to-br from-lime-400 to-lime-500 rounded-[20px] p-16 flex items-center justify-center w-full md:w-[416px] h-[416px] flex-shrink-0">
                            <div className="relative w-[280px] h-[280px]">
                                <Image
                                    src="https://cdn.abbhome.az/partner_2_2234ed6b05.webp"
                                    alt="Building under construction"
                                    width={280}
                                    height={280}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex-1 py-4">
                            <h2 className="text-[32px] font-medium text-gray-900 mb-5 leading-tight">
                                Partnyor tikinti şirkətləri üzrə ipoteka krediti
                            </h2>

                            <p className="text-gray-600 text-[16px] leading-relaxed mb-8">
                                Bankın partnyorları olan tikinti şirkətlərinə məxsus çıxarışsız mənzillərin, həmçinin fərdi yaşayış evlərinin alınması üçün nəzərdə tutulan daxili ipoteka kreditidir.
                            </p>
                            <div className="grid grid-cols-4 gap-8 mb-8">
                                <div className="space-y-1">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        300,000 AZN
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Maksimal məbləğ
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        11%-dən
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Minimal illik faiz
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        20 ilədək
                                    </div>
                                    <div className="text-[16px] text-gray-500 whitespace-nowrap">
                                        Maksimal müddət
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[22px] font-bold text-gray-900 whitespace-nowrap">
                                        10%-dən
                                    </div>
                                    <div className="text-[16px] text-gray-500 whitespace-nowrap">
                                        Minimal ilkin ödəniş
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-7 py-3 rounded-lg transition-all duration-200">
                                    Daha ətraflı
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-200 my-10"></div>
                <div className="bg-white overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-[20px] p-16 flex items-center justify-center w-full md:w-[416px] h-[416px] flex-shrink-0">
                            <div className="relative w-[280px] h-[280px]">
                                <Image
                                    src="https://cdn.abbhome.az/land_7a8b3575cb.webp"
                                    alt="Car loan"
                                    width={280}
                                    height={280}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex-1 py-4">
                            <h2 className="text-[32px] font-medium text-gray-900 mb-5 leading-tight">
                                Torpaq ipoteka krediti
                            </h2>

                            <p className="text-gray-600 text-[16px] leading-relaxed mb-8">
                                Bakı, Sumqayıt, Abşeron, Gəncə, Şamaxı, Qəbələ, Quba, Qusar, Xaçmaz ərazilərində çıxarış sənədi və təyinatı yaşayış sahəsi olan torpaq sahəsinin alışı üçün nəzərdə tutulan ipoteka kreditidir.
                            </p>
                            <div className="grid grid-cols-4 gap-8 mb-8">
                                <div className="space-y-1">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        100,000 AZN
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Maksimal məbləğ
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        9%-dən
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Minimal illik faiz
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        7 ilədək
                                    </div>
                                    <div className="text-[16px] text-gray-500 whitespace-nowrap">
                                        Maksimal müddət
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        0%-dən
                                    </div>
                                    <div className="text-[16px] text-gray-500 whitespace-nowrap">
                                        Minimal ilkin ödəniş
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-7 py-3 rounded-lg transition-all duration-200">
                                    Müraciət edin
                                </button>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-7 py-3 rounded-lg transition-all duration-200">
                                    Daha ətraflı
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-200 my-10"></div>
                <div className="bg-white overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-[20px] p-16 flex items-center justify-center w-full md:w-[416px] h-[416px] flex-shrink-0">
                            <div className="relative w-[280px] h-[280px]">
                                <Image
                                    src="https://cdn.abbhome.az/construction_144e34074e.webp"
                                    alt="Business loan"
                                    width={280}
                                    height={280}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex-1 py-4">
                            <h2 className="text-[32px] font-medium text-gray-900 mb-5 leading-tight">
                                Ev tikinti ipoteka krediti
                            </h2>

                            <p className="text-gray-600 text-[16px] leading-relaxed mb-8">
                                Yaşayış təyinatlı çıxarışlı torpaq sahəsində fərdi yaşayış evinin tikintisi üçün nəzərdə tutulan daxili ipoteka kreditidir.
                            </p>

                            <div className="grid grid-cols-4 gap-8 mb-8">
                                <div className="space-y-1">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        1,000,000 AZN
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Maksimal məbləğ
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        14%-dən
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Minimal illik faiz
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        10 ilədək
                                    </div>
                                    <div className="text-[16px] text-gray-500 whitespace-nowrap">
                                        Maksimal müddət
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        20%-dən
                                    </div>
                                    <div className="text-[16px] text-gray-500 whitespace-nowrap">
                                        Minimal ilkin ödəniş
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-7 py-3 rounded-lg transition-all duration-200">
                                    Müraciət edin
                                </button>
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-7 py-3 rounded-lg transition-all duration-200">
                                    Daha ətraflı
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-200 my-10"></div>

                <div className="bg-white overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-[20px] p-16 flex items-center justify-center w-full md:w-[416px] h-[416px] flex-shrink-0">
                            <div className="relative w-[280px] h-[280px]">
                                <Image
                                    src="https://cdn.abbhome.az/deposit_7b66244ef0.webp"
                                    alt="Education loan"
                                    width={280}
                                    height={280}
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex-1 py-4">
                            <h2 className="text-[32px] font-medium text-gray-900 mb-5 leading-tight">
                                İpoteka əmanəti krediti
                            </h2>

                            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                                Ali təhsil almaq istəyən gənclərimiz üçün xüsusi kredit məhsulu. Yerli və xarici universitetlərdə təhsil haqqını ödəmək üçün əlverişli şərtlərlə maliyyələşdirmə imkanı.
                            </p>

                            <div className="grid grid-cols-4 gap-8 mb-8">
                                <div className="space-y-1">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        50,000 AZN
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Maksimal məbləğ
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        8%-dən
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Minimal illik faiz
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        15 ilədək
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Maksimal müddət
                                    </div>
                                </div>

                                <div className="space-y-1 border-l border-gray-200 pl-8">
                                    <div className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                                        0%-dən
                                    </div>
                                    <div className="text-[16px] text-gray-500">
                                        Minimal ilkin ödəniş
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-7 py-3 rounded-lg transition-all duration-200">
                                    Daha ətraflı
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}