'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Word {
    _id: string;
    wordId: string;
    translations: {
        az: string;
        en: string;
        ru: string;
    };
    description: string;
    isActive: boolean;
    createdAt: string;
}

interface FormData {
    wordId: string;
    az: string;
    en: string;
    ru: string;
    description: string;
}

interface Message {
    type: 'success' | 'error' | '';
    text: string;
}

// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function WordsPage() {
    const [formData, setFormData] = useState<FormData>({
        wordId: '',
        az: '',
        en: '',
        ru: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });
    const [words, setWords] = useState<Word[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        try {
            const res = await fetch(`${API_URL}/api/words`);
            const data = await res.json();
            if (data.success) {
                setWords(data.data);
            }
        } catch (error) {
            showMessage('error', 'Failed to fetch words');
            console.error(error);
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
        id: string, 
        field: string
    ) => {
        setWords(words.map(w => {
            if (w._id === id) {
                if (field === 'description' || field === 'wordId') {
                    return { ...w, [field]: e.target.value };
                } else {
                    return {
                        ...w,
                        translations: {
                            ...w.translations,
                            [field]: e.target.value
                        }
                    };
                }
            }
            return w;
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.wordId) {
            showMessage('error', 'Word ID is required');
            return;
        }

        if (!formData.az || !formData.en || !formData.ru) {
            showMessage('error', 'All three languages are required (AZ, EN, RU)');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/words`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    wordId: formData.wordId,
                    translations: {
                        az: formData.az,
                        en: formData.en,
                        ru: formData.ru
                    },
                    description: formData.description
                })
            });

            const data = await res.json();

            if (data.success) {
                showMessage('success', 'Word added successfully');
                fetchWords();
                setIsAddingNew(false);
                setFormData({ wordId: '', az: '', en: '', ru: '', description: '' });
            } else {
                showMessage('error', data.message || 'Failed to add word');
            }
        } catch (error) {
            showMessage('error', 'Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: string) => {
        const word = words.find(w => w._id === id);
        if (!word) return;

        if (!word.wordId || !word.translations.az || !word.translations.en || !word.translations.ru) {
            showMessage('error', 'Word ID and all languages are required');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/words/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    wordId: word.wordId,
                    translations: word.translations,
                    description: word.description
                })
            });

            const data = await res.json();

            if (data.success) {
                showMessage('success', 'Word updated successfully');
                setEditingId(null);
                fetchWords();
            } else {
                showMessage('error', 'Failed to update word');
            }
        } catch (error) {
            showMessage('error', 'Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this word?')) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/words/${id}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (data.success) {
                showMessage('success', 'Word deleted successfully');
                fetchWords();
            } else {
                showMessage('error', 'Failed to delete word');
            }
        } catch (error) {
            showMessage('error', 'Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    const toggleActive = async (id: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/words/${id}/toggle`, {
                method: 'PATCH'
            });

            const data = await res.json();

            if (data.success) {
                showMessage('success', 'Status updated successfully');
                fetchWords();
            }
        } catch (error) {
            showMessage('error', 'Failed to toggle status');
        } finally {
            setLoading(false);
        }
    };

    const cancelAdd = () => {
        setIsAddingNew(false);
        setFormData({ wordId: '', az: '', en: '', ru: '', description: '' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        fetchWords();
    };

    const filteredWords = words.filter(w => 
        w.wordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.translations.az.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.translations.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.translations.ru.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between bg-white border-b px-6 py-4 rounded-t-lg shadow">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Words Management</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage multi-language content with unique IDs (AZ / EN / RU)
                    </p>
                </div>
                <button
                    onClick={() => setIsAddingNew(true)}
                    disabled={isAddingNew || loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                    + Add New Word
                </button>
            </div>

            {/* Message */}
            {message.text && (
                <div className={`p-4 rounded-lg ${
                    message.type === 'success'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Search by ID, text, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="block mt-2 text-sm text-gray-500">
                    Showing {filteredWords.length} of {words.length} words
                </span>
            </div>

            {/* Add New Form */}
            {isAddingNew && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Word</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🆔 Word ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="wordId"
                                value={formData.wordId}
                                onChange={handleChange}
                                placeholder="hero_title, contact_btn, footer_text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Unique identifier for this text (use snake_case)
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🇦🇿 Azərbaycan <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="az"
                                    value={formData.az}
                                    onChange={handleChange}
                                    placeholder="Salam"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🇬🇧 English <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="en"
                                    value={formData.en}
                                    onChange={handleChange}
                                    placeholder="Hello"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    🇷🇺 Русский <span className="text-red-500">*</span>
                                </label>
                                <input
                                    name="ru"
                                    value={formData.ru}
                                    onChange={handleChange}
                                    placeholder="Привет"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📝 Description (optional)
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Where this text is used..."
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium"
                            >
                                {loading ? 'Saving...' : 'Save Word'}
                            </button>
                            <button
                                type="button"
                                onClick={cancelAdd}
                                disabled={loading}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                🆔 ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                🇦🇿 AZ
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                🇬🇧 EN
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                🇷🇺 RU
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Description
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredWords.map(word => (
                            <tr key={word._id} className="hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    {editingId === word._id ? (
                                        <input
                                            value={word.wordId}
                                            onChange={(e) => handleEditChange(e, word._id, 'wordId')}
                                            className="w-full px-2 py-1 border border-gray-300 rounded font-mono text-sm"
                                        />
                                    ) : (
                                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                            {word.wordId}
                                        </code>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    {editingId === word._id ? (
                                        <input
                                            value={word.translations.az}
                                            onChange={(e) => handleEditChange(e, word._id, 'az')}
                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                        />
                                    ) : (
                                        <span>{word.translations.az}</span>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    {editingId === word._id ? (
                                        <input
                                            value={word.translations.en}
                                            onChange={(e) => handleEditChange(e, word._id, 'en')}
                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                        />
                                    ) : (
                                        <span>{word.translations.en}</span>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    {editingId === word._id ? (
                                        <input
                                            value={word.translations.ru}
                                            onChange={(e) => handleEditChange(e, word._id, 'ru')}
                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                        />
                                    ) : (
                                        <span>{word.translations.ru}</span>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    {editingId === word._id ? (
                                        <textarea
                                            value={word.description}
                                            onChange={(e) => handleEditChange(e, word._id, 'description')}
                                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                            rows={2}
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-600">
                                            {word.description || '-'}
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => toggleActive(word._id)}
                                        disabled={loading}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            word.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {word.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex gap-2">
                                        {editingId === word._id ? (
                                            <>
                                                <button
                                                    onClick={() => handleUpdate(word._id)}
                                                    disabled={loading}
                                                    className="text-green-600 hover:text-green-900 font-medium text-sm"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    disabled={loading}
                                                    className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setEditingId(word._id)}
                                                    disabled={loading}
                                                    className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(word._id)}
                                                    disabled={loading}
                                                    className="text-red-600 hover:text-red-900 font-medium text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredWords.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        {searchTerm 
                            ? 'No words match your search.' 
                            : 'No words found. Add your first word!'
                        }
                    </div>
                )}
            </div>
        </div>
    );
}