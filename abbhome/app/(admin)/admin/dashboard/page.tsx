'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface Stats {
    totalProducts: number
    totalLanguages: number
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats>({
        totalProducts: 0,
        totalLanguages: 0,
    })

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async (): Promise<void> => {
        try {
            const [productsRes, languagesRes] = await Promise.all([
                fetch('http://localhost:5000/api/products'),
                fetch('http://localhost:5000/api/languages'),
            ])

            const productsData = await productsRes.json()
            const languagesData = await languagesRes.json()

            setStats({
                totalProducts: productsData.success ? productsData.data.length : 0,
                totalLanguages: languagesData.success ? languagesData.data.length : 0,
            })
        } catch (error) {
            console.error('Error fetching stats:', error)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
                <h2 className="text-xl font-semibold">Dashboard Overview</h2>
            </div>
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Products</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {stats.totalProducts}
                                </p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Languages</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">
                                    {stats.totalLanguages}
                                </p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">System Status</p>
                                <p className="text-xl font-bold text-green-600 mt-2">Active</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href="/admin/products"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                        >
                            <div className="bg-blue-100 p-2 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="font-medium">Add New Product</p>
                                <p className="text-sm text-gray-500">Create a new product entry</p>
                            </div>
                        </Link>

                        <Link
                            href="/admin/languages"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                        >
                            <div className="bg-green-100 p-2 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="font-medium">Add New Language</p>
                                <p className="text-sm text-gray-500">Add a new language option</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
