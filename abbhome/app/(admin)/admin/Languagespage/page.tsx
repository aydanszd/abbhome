'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';

interface Language {
    _id: string;
    code: string;
    name: string;
    nativeName: string;
    flag: string;
    isActive: boolean;
}

interface FormData {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
}

interface Message {
    type: 'success' | 'error' | '';
    text: string;
}

export default function LanguagesPage() {
    const [formData, setFormData] = useState<FormData>({
        code: '',
        name: '',
        nativeName: '',
        flag: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });
    const [languages, setLanguages] = useState<Language[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        fetchLanguages();
    }, []);

    const fetchLanguages = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/languages');
            const data = await res.json();
            if (data.success) setLanguages(data.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, id: string | null = null) => {
        if (id) {
            setLanguages(languages.map(l => l._id === id ? { ...l, [e.target.name]: e.target.value } : l));
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/languages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                fetchLanguages();
                setIsAddingNew(false);
                setFormData({ code: '', name: '', nativeName: '', flag: '' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure?')) return;
        await fetch(`http://localhost:5000/api/languages/${id}`, { method: 'DELETE' });
        fetchLanguages();
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between h-16 bg-white border-b px-4">
                <h2 className="text-xl font-semibold">Language Management</h2>
                <button
                    onClick={() => setIsAddingNew(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                    + Add New Language
                </button>
            </div>
            {message.text && (
                <div className={`p-3 rounded ${message.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {message.text}
                </div>
            )}
            <div className="bg-white rounded shadow">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Flag</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Native</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isAddingNew && (
                            <tr>
                                <td><input name="flag" onChange={handleChange} /></td>
                                <td><input name="code" onChange={handleChange} /></td>
                                <td><input name="name" onChange={handleChange} /></td>
                                <td><input name="nativeName" onChange={handleChange} /></td>
                                <td>
                                    <button onClick={handleSubmit}>Save</button>
                                </td>
                            </tr>
                        )}

                        {languages.map(l => (
                            <tr key={l._id}>
                                <td>{l.flag}</td>
                                <td>{l.code}</td>
                                <td>{l.name}</td>
                                <td>{l.nativeName}</td>
                                <td>
                                    <button onClick={() => handleDelete(l._id)} className="text-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
