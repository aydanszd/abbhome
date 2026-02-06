'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

// Type definitions
interface Product {
    _id: string;
    name: string;
    desc: string;
    bg: string;
    img: string;
    price: number;
    percent1: number;
    percent2: number;
    years: number;
}

interface ApiResponse {
    success: boolean;
    data: Product[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function MortgageLoans() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setError(null);
            const response = await fetch(`${API_URL}/api/products`);
            
            if (!response.ok) {
                throw new Error('Məhsullar yüklənərkən xəta baş verdi');
            }
            
            const data: ApiResponse = await response.json();
            console.log('Fetched data:', data);
            
            if (data.success && data.data) {
                setProducts(data.data);
            } else {
                throw new Error('Məlumat əldə edilə bilmədi');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error instanceof Error ? error.message : 'Xəta baş verdi');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Yüklənir...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-lg mb-4">{error}</p>
                    <button 
                        onClick={fetchProducts}
                        className="bg-[#1B63ED] hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
                    >
                        Yenidən cəhd edin
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 ${inter.className}`}>
            <div className="max-w-7xl mx-auto space-y-8">
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Hələ heç bir məhsul yoxdur</p>
                    </div>
                ) : (
                    products.map((product, index) => (
                        <React.Fragment key={product._id}>
                            <div className="bg-white overflow-hidden">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    {/* Image Container */}
                                    <div 
                                        className="relative rounded-[20px] p-8 md:p-16 flex items-center justify-center w-full md:w-104 h-64 md:h-104 shrink-0"
                                        style={{ background: product.bg }}
                                    >
                                        <div className="relative w-48 h-48 md:w-70 md:h-70">
                                            <Image
                                                src={`${API_URL}${product.img}`}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 768px) 192px, 280px"
                                                className="object-contain drop-shadow-2xl"
                                                onError={(e) => {
                                                    const target = e.currentTarget;
                                                    target.src = 'https://via.placeholder.com/280';
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 py-4 w-full">
                                        <h2 className="text-2xl md:text-[32px] font-medium text-gray-900 mb-4 md:mb-5 leading-tight">
                                            {product.name}
                                        </h2>

                                        <p className="text-gray-600 text-sm md:text-[16px] leading-relaxed mb-6 md:mb-8">
                                            {product.desc}
                                        </p>
                                        
                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8">
                                            <div className="space-y-1">
                                                <div className="text-lg md:text-[20px] font-semibold text-gray-900">
                                                    {product.price.toLocaleString('az-AZ')} AZN
                                                </div>
                                                <div className="text-xs md:text-[16px] text-gray-500">
                                                    Maksimal məbləğ
                                                </div>
                                            </div>

                                            <div className="space-y-1 lg:border-l border-gray-200 lg:pl-8">
                                                <div className="text-lg md:text-[20px] font-semibold text-gray-900">
                                                    {product.percent1}%-dən
                                                </div>
                                                <div className="text-xs md:text-[16px] text-gray-500">
                                                    Minimal illik faiz
                                                </div>
                                            </div>

                                            <div className="space-y-1 lg:border-l border-gray-200 lg:pl-8">
                                                <div className="text-lg md:text-[20px] font-semibold text-gray-900">
                                                    {product.years} ilədək
                                                </div>
                                                <div className="text-xs md:text-[16px] text-gray-500">
                                                    Maksimal müddət
                                                </div>
                                            </div>

                                            <div className="space-y-1 lg:border-l border-gray-200 lg:pl-8">
                                                <div className="text-lg md:text-[22px] font-semibold text-gray-900">
                                                    {product.percent2}%-dən
                                                </div>
                                                <div className="text-xs md:text-[13px] text-gray-500">
                                                    Minimal ilkin ödəniş
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-3">
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
                            
                            {/* Divider */}
                            {index < products.length - 1 && (
                                <div className="border-b border-gray-200 my-10"></div>
                            )}
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>
    );
}