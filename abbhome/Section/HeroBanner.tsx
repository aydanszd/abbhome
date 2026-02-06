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

interface CreditInfo {
    amount: string
    amountLabel: string
    rate: string
    rateLabel: string
    period: string
    periodLabel: string
    payment: string
    paymentLabel: string
}

interface SlideData {
    title: string
    description: string
    buttonText: string
    detailsText?: string
    image: string
    gradient: string
    creditInfo?: CreditInfo
}

const slides: SlideData[] = [
    {
        title: "İpoteka krediti ilə MTK-dan mənzil alın,ödənilmiş ƏDV-nin 30% sizə qalsın",
        description: "\"Əmlakınızı qiymətləndirin\" aləti ilə daşınmaz əmlakın təxmini bazar qiymətini öyrənmək artıq asan oldu.",
        buttonText: "İndi öyrənin",
        detailsText: "Daha ətraflı",
        image: "https://cdn.abbhome.az/tamkart_slider_1_1fa6bedbef.png",
        gradient: "bg-gray-800",
        creditInfo: {
            amount: "200,000 AZN",
            amountLabel: "Maksimal məbləğ",
            rate: "12%-dən",
            rateLabel: "Minimal illik faiz",
            period: "15 ilədək",
            periodLabel: "Maksimal müddət",
            payment: "15%",
            paymentLabel: "Minimal ilkin ödəniş"
        }
    },
    {
        title: "İpoteka krediti ilə MTK-dan mənzil alın,ödənilmiş ƏDV-nin 30% sizə qalsın",
        description: "Fərdi layihəniz ilə evə sahib olun – Tikinti ipoteka krediti ilə istədiyiniz evi tikin!",
        buttonText: "Müraciət edin",
        detailsText: "Daha ətraflı",
        image: "https://cdn.abbhome.az/construction_144e34074e.webp",
        gradient: "bg-purple-800",
        creditInfo: {
            amount: "150,000 AZN",
            amountLabel: "Maksimal məbləğ",
            rate: "10%-dən",
            rateLabel: "Minimal illik faiz",
            period: "20 ilədək",
            periodLabel: "Maksimal müddət",
            payment: "20%",
            paymentLabel: "Minimal ilkin ödəniş"
        }
    },
    {
        title: "İpoteka krediti ilə MTK-dan mənzil alın,ödənilmiş ƏDV-nin 30% sizə qalsın",
        description: "Dövlət dəstəyi ilə sərfəli şərtlərlə mənzil əldə edin.",
        buttonText: "Müraciət et",
        detailsText: "Daha ətraflı",
        image: "https://cdn.abbhome.az/government_2146a202a2.webp",
        gradient: "bg-[#3BA6DE]",
        creditInfo: {
            amount: "100,000 AZN",
            amountLabel: "Maksimal məbləğ",
            rate: "5%-dən",
            rateLabel: "Minimal illik faiz",
            period: "25 ilədək",
            periodLabel: "Maksimal müddət",
            payment: "0%",
            paymentLabel: "Minimal ilkin ödəniş"
        }
    },
    {
        title: "İpoteka krediti ilə MTK-dan mənzil alın,ödənilmiş ƏDV-nin 30% sizə qalsın",
        description: "Sərfəli faiz dərəcələri ilə təminatlı istehlak kreditindən yararlanın.",
        buttonText: "Ətraflı",
        detailsText: "Daha ətraflı",
        image: "https://cdn.abbhome.az/secured_consumer_991bfb9bcd.webp",
        gradient: "bg-[#0057c2]",
        creditInfo: {
            amount: "75,000 AZN",
            amountLabel: "Maksimal məbləğ",
            rate: "14%-dən",
            rateLabel: "Minimal illik faiz",
            period: "7 ilədək",
            periodLabel: "Maksimal müddət",
            payment: "25%",
            paymentLabel: "Minimal ilkin ödəniş"
        }
    },
    {
        title: "İpoteka krediti ilə MTK-dan mənzil alın,ödənilmiş ƏDV-nin 30% sizə qalsın",
        description: "Seçilmiş partnyorlarımızdan alış-veriş edin və xüsusi endirimlər qazanın.",
        buttonText: "Daha Ətraflı",
        image: "https://cdn.abbhome.az/d781b4fa223f598c9eb8dd5e5f33026ba21534c1_707f79ba33.png",
        gradient: "bg-gray-500"
    }
]

const AUTOPLAY_INTERVAL = 20000000 

export default function MortgageCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [progress, setProgress] = useState(0)

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
                                                {slide.title}
                                            </h1>
                                            <p className="text-lg text-white/90">
                                                {slide.description}
                                            </p>
                                            {!slide.creditInfo && (
                                                <button className="bg-white text-black px-6 py-3 rounded-[10px] font-semibold hover:bg-blue-50 transition-colors">
                                                    {slide.buttonText}
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative flex items-center justify-center h-full">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={slide.image}
                                                    alt={slide.title}
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
                                            {currentSlide.creditInfo.amountLabel}
                                        </div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gray-200"></div>
                                    </div>
                                    <div className="flex flex-col h-full justify-center relative pr-8">
                                        <div className="text-xl font-bold text-gray-900">
                                            {currentSlide.creditInfo.rate}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {currentSlide.creditInfo.rateLabel}
                                        </div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gray-200"></div>
                                    </div>
                                    <div className="flex flex-col h-full justify-center relative pr-8">
                                        <div className="text-xl font-bold text-gray-900">
                                            {currentSlide.creditInfo.period}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {currentSlide.creditInfo.periodLabel}
                                        </div>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gray-200"></div>
                                    </div>
                                    <div className="flex flex-col h-full justify-center">
                                        <div className="text-xl font-bold text-gray-900">
                                            {currentSlide.creditInfo.payment}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {currentSlide.creditInfo.paymentLabel}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                                        {currentSlide.buttonText}
                                    </button>
                                    <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap">
                                        {currentSlide.detailsText || "Daha ətraflı"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={` ${currentSlide?.creditInfo ? "mt-24" : "mt-12"}`}>
                <h2 className="text-[32px] font-bold mb-10 ml-15">İpoteka məhsulları</h2>
                <div className={`flex flex-wrap gap-3 max-w-300 mx-auto  ${fira.className}`}>
                    <button className=" text-[16px] px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-normal hover:bg-blue-200 transition-colors">
                        Hamısı
                    </button>
                    <button className="  text-[16px] px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        Mənzil və həyət evləri
                    </button>
                    <button className=" text-[16px] px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        Partnyor şirkətlər
                    </button>
                    <button className=" text-[16px] px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        Torpaq sahəsi
                    </button>
                    <button className="px-6 py-3  text-[16px] bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        Ev tikintisi və təmir
                    </button>
                    <button className="px-6 py-3  text-[16px] bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        Dövlət ipotekası
                    </button>
                    <button className="px-6 py-3  text-[16px] bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors">
                        Biznes obyekti
                    </button>
                </div>
            </div>
        </div>
    )
}