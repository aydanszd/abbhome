'use client'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Fira_Sans, Inter } from 'next/font/google'

const fira = Fira_Sans({
    subsets: ['latin'],
    weight: ['500'],
})

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
})

interface Translation {
    az: string;
    en: string;
    ru: string;
}

interface Word {
    _id: string;
    wordId: string;
    translations: Translation;
    description: string;
    isActive: boolean;
}

type Language = 'az' | 'en' | 'ru';

interface CreditInfo {
    amount: string
    rate: string
    period: string
    payment: string
}

interface SlideData {
    titleKey: string
    descriptionKey: string
    buttonTextKey: string
    image: string
    gradient: string
    creditInfo?: CreditInfo
}

const slides: SlideData[] = [
    {
        titleKey: "carousel_slide1_title",
        descriptionKey: "carousel_slide1_description",
        buttonTextKey: "carousel_slide1_button",
        image: "https://cdn.abbhome.az/tamkart_slider_1_1fa6bedbef.png",
        gradient: "bg-gray-800",
        creditInfo: {
            amount: "200,000 AZN",
            rate: "12%-dən",
            period: "15 ilədək",
            payment: "15%"
        }
    },
    {
        titleKey: "carousel_slide2_title",
        descriptionKey: "carousel_slide2_description",
        buttonTextKey: "carousel_slide2_button",
        image: "https://cdn.abbhome.az/construction_144e34074e.webp",
        gradient: "bg-purple-800",
        creditInfo: {
            amount: "150,000 AZN",
            rate: "10%-dən",
            period: "20 ilədək",
            payment: "20%"
        }
    },
    {
        titleKey: "carousel_slide3_title",
        descriptionKey: "carousel_slide3_description",
        buttonTextKey: "carousel_slide3_button",
        image: "https://cdn.abbhome.az/government_2146a202a2.webp",
        gradient: "bg-[#3BA6DE]",
        creditInfo: {
            amount: "100,000 AZN",
            rate: "5%-dən",
            period: "25 ilədək",
            payment: "0%"
        }
    },
    {
        titleKey: "carousel_slide4_title",
        descriptionKey: "carousel_slide4_description",
        buttonTextKey: "carousel_slide4_button",
        image: "https://cdn.abbhome.az/secured_consumer_991bfb9bcd.webp",
        gradient: "bg-[#0057c2]",
        creditInfo: {
            amount: "75,000 AZN",
            rate: "14%-dən",
            period: "7 ilədək",
            payment: "25%"
        }
    },
    {
        titleKey: "carousel_slide5_title",
        descriptionKey: "carousel_slide5_description",
        buttonTextKey: "carousel_slide5_button",
        image: "https://cdn.abbhome.az/d781b4fa223f598c9eb8dd5e5f33026ba21534c1_707f79ba33.png",
        gradient: "bg-gray-500"
    }
]

const AUTOPLAY_INTERVAL = 5000

export default function MortgageCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [words, setWords] = useState<Record<string, Translation>>({})
    const [currentLang, setCurrentLang] = useState<Language>('az')

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && ['az', 'en', 'ru'].includes(savedLang)) {
            setCurrentLang(savedLang);
        }

        const handleLanguageChange = (e: CustomEvent) => {
            setCurrentLang(e.detail as Language);
        };

        window.addEventListener('languageChange', handleLanguageChange as EventListener);
        return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    }, []);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/words`);
                if (!response.ok) throw new Error('Failed to fetch words');
                
                const result = await response.json();
                
                let data: Word[];
                
                if (Array.isArray(result)) {
                    data = result;
                } else if (result.data && Array.isArray(result.data)) {
                    data = result.data;
                } else if (result.words && Array.isArray(result.words)) {
                    data = result.words;
                } else {
                    throw new Error('Invalid response structure');
                }
                
                const wordsMap = data
                    .filter(item => item.wordId && item.wordId.startsWith('carousel_'))
                    .reduce((acc, item) => {
                        acc[item.wordId] = item.translations;
                        return acc;
                    }, {} as Record<string, Translation>);
                
                setWords(wordsMap);
            } catch (error) {
                console.error('Error fetching carousel words:', error);
            }
        };

        fetchWords();
    }, []);

    const getText = (key: string): string => {
        return words[key]?.[currentLang] || '';
    };

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setProgress(0)
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    if (emblaApi) emblaApi.scrollNext()
                    return 0
                }
                return prev + (100 / (AUTOPLAY_INTERVAL / 100))
            })
        }, 100)

        return () => clearInterval(interval)
    }, [emblaApi])

    const currentSlide = slides[selectedIndex]

    return (
        <div className="w-full max-w-336 mx-auto px-4 py-8 -mt-7.5">
            <div className="relative">
                <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                    <div className="flex">
                        {slides.map((slide, index) => (
                            <div key={index} className="flex-[0_0_100%] min-w-0">
                                <div className={`${slide.gradient} rounded-2xl px-12 pt-12 relative overflow-hidden h-120`}>
                                    <div className="grid grid-cols-2 gap-8 items-center h-full">
                                        <div className="text-white space-y-6">
                                            <h1 className="text-4xl font-bold leading-tight">
                                                {getText(slide.titleKey)}
                                            </h1>
                                            <p className="text-lg text-white/90">
                                                {getText(slide.descriptionKey)}
                                            </p>
                                            {!slide.creditInfo && (
                                                <button className="bg-white text-black px-6 py-3 rounded-[10px] font-semibold hover:bg-blue-50 transition-colors">
                                                    {getText(slide.buttonTextKey)}
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative flex items-center justify-center h-full">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={slide.image}
                                                    alt={getText(slide.titleKey)}
                                                    fill
                                                    className="object-contain"
                                                    priority={index === 0}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-0 pointer-events-none h-120">
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 -ml-6.5 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl border border-gray-200 hover:bg-white transition-all z-20 pointer-events-auto"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 -mr-6.5 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl border border-gray-200 hover:bg-white transition-all z-20 pointer-events-auto"
                    >
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
                            <circle
                                cx="24"
                                cy="24"
                                r="22"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="2"
                            />
                            <circle
                                cx="24"
                                cy="24"
                                r="22"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                strokeDasharray={`${2 * Math.PI * 22}`}
                                strokeDashoffset={`${2 * Math.PI * 22 * (1 - progress / 100)}`}
                                strokeLinecap="round"
                                className="transition-all duration-100 ease-linear"
                            />
                        </svg>
                        <ChevronRight className="w-6 h-6 text-gray-800 relative z-10" />
                    </button>
                </div>
                {currentSlide?.creditInfo && (
                    <div className="relative z-20 -mt-16 px-8 ">
                        <div className="bg-white rounded-2xl p-6 shadow-xl h-32 max-w-300 mx-auto">
                            <div className="flex items-center justify-between gap-6 h-full">
                                <div className="flex items-center gap-8 flex-1 h-full">
                                    <div className="flex flex-col h-full justify-center relative pr-8">
                                        <div className="text-xl font-bold text-gray-900">
                                            {currentSlide.creditInfo.amount}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {getText('carousel_maksimal_mebleg')}
                                        </div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gray-200"></div>
                                    </div>
                                    <div className="flex flex-col h-full justify-center relative pr-8">
                                        <div className="text-xl font-bold text-gray-900">
                                            {currentSlide.creditInfo.rate}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {getText('carousel_minimal_faiz')}
                                        </div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gray-200"></div>
                                    </div>
                                    <div className="flex flex-col h-full justify-center relative pr-8">
                                        <div className="text-xl font-bold text-gray-900">
                                            {currentSlide.creditInfo.period}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {getText('carousel_maksimal_muddet')}
                                        </div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gray-200"></div>
                                    </div>
                                    <div className="flex flex-col h-full justify-center">
                                        <div className="text-xl font-bold text-gray-900">
                                            {currentSlide.creditInfo.payment}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {getText('carousel_minimal_odenis')}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                                        {getText(currentSlide.buttonTextKey)}
                                    </button>
                                    <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap">
                                        {getText('carousel_daha_etraflı')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={` ${currentSlide?.creditInfo ? "mt-24" : "mt-12"}`}>
                <h2 className="text-[32px] font-bold mb-10 ml-15">
                    {getText('carousel_ipoteka_mehsullari')}
                </h2>
                <div className={`flex flex-wrap gap-3 max-w-300 mx-auto  ${fira.className}`}>
                    <button className=" text-[16px] px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-normal hover:bg-blue-200 transition-colors">
                        {getText('carousel_hamisi')}
                    </button>
                    <button className="  text-[16px] px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        {getText('carousel_menzil_evler')}
                    </button>
                    <button className=" text-[16px] px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        {getText('carousel_partnyor_sirketler')}
                    </button>
                    <button className=" text-[16px] px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        {getText('carousel_torpaq_sahesi')}
                    </button>
                    <button className="px-6 py-3  text-[16px] bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        {getText('carousel_ev_tikintisi')}
                    </button>
                    <button className="px-6 py-3  text-[16px] bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        {getText('carousel_dovlet_ipotekasi')}
                    </button>
                    <button className="px-6 py-3  text-[16px] bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        {getText('carousel_biznes_obyekti')}
                    </button>
                </div>
            </div>
        </div>
    )
}