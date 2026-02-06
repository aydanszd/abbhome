'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';

interface Product {
    _id: string;
    name: string;
    desc: string;
    bg: string;
    price: string | number;
    percent1: string | number;
    percent2: string | number;
    years: string | number;
    img: string;
    newImage?: File;
}

interface FormData {
    name: string;
    desc: string;
    bg: string;
    price: string;
    percent1: string;
    percent2: string;
    years: string;
}

interface Message {
    type: 'success' | 'error' | '';
    text: string;
}

export default function ProductsPage() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        desc: '',
        bg: '',
        price: '',
        percent1: '',
        percent2: '',
        years: ''
    });
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });
    const [products, setProducts] = useState<Product[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/products');
            const data = await res.json();
            if (data.success) setProducts(data.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setImage(file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const fd = new FormData();
            Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
            if (image) fd.append('img', image);

            const res = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                body: fd
            });

            if (res.ok) {
                fetchProducts();
                handleCancel();
                setMessage({ type: 'success', text: 'Product added successfully!' });
                setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add product' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsAddingNew(false);
        setFormData({ name: '', desc: '', bg: '', price: '', percent1: '', percent2: '', years: '' });
        setImage(null);
        setImagePreview(null);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
            fetchProducts();
            setMessage({ type: 'success', text: 'Product deleted successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete product' });
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            {/* Header */}
            <div className="flex items-center justify-between h-16 bg-white border-b px-8">
                <h2 className="text-xl font-semibold text-gray-800">Products</h2>
                <button
                    onClick={() => setIsAddingNew(true)}
                    disabled={isAddingNew}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    + Add Product
                </button>
            </div>
            <div className="p-8 flex-1 overflow-y-auto">
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        message.type === 'success' 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {message.text}
                    </div>
                )}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="relative max-w-md">
                            <svg 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search for products"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Background</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Percent 1</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Percent 2</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Years</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isAddingNew && (
                                    <tr className="border-b border-gray-200 bg-purple-50">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center gap-2">
                                                {imagePreview ? (
                                                    <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <label className="cursor-pointer text-xs text-purple-600 hover:text-purple-800">
                                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                                    Upload
                                                </label>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                name="desc"
                                                value={formData.desc}
                                                onChange={handleChange}
                                                placeholder="Description"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                name="bg"
                                                value={formData.bg}
                                                onChange={handleChange}
                                                placeholder="#FFFFFF"
                                                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="0"
                                                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                name="percent1"
                                                value={formData.percent1}
                                                onChange={handleChange}
                                                placeholder="0"
                                                className="w-16 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                name="percent2"
                                                value={formData.percent2}
                                                onChange={handleChange}
                                                placeholder="0"
                                                className="w-16 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                name="years"
                                                value={formData.years}
                                                onChange={handleChange}
                                                placeholder="0"
                                                className="w-16 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={loading}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                    title="Save"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                                    title="Cancel"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {filteredProducts.length === 0 && !isAddingNew ? (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                                            No products found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((p) => (
                                        <tr key={p._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <img 
                                                    src={`http://localhost:5000${p.img}`} 
                                                    alt={p.name}
                                                    className="w-16 h-16 object-cover rounded-lg" 
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{p.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{p.desc}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{p.bg}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">${p.price}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{p.percent1}%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{p.percent2}%</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{p.years}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => setEditingId(p._id)} 
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(p._id)} 
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}