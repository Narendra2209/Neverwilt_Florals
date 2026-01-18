import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Upload } from 'lucide-react';

export default function Admin() {
    const { products, addProduct, deleteProduct } = useShop();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Bouquets',
        image: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price) return;

        // Use placeholder if no image
        const productToAdd = {
            ...formData,
            price: Number(formData.price),
            image: formData.image || 'https://images.unsplash.com/photo-1596003906949-672500c39d42?q=80&w=400&fit=crop'
        };

        addProduct(productToAdd);
        setFormData({ name: '', price: '', category: 'Bouquets', image: '', description: '' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-brand-dark">Product Management</h1>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                    Admin Mode
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Add Product Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="font-serif text-xl font-bold text-brand-dark mb-6 flex items-center">
                            <Plus className="h-5 w-5 mr-2" /> Add New Product
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink outline-none transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-pink outline-none"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-pink outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Bouquets</option>
                                        <option>Indoor Plants</option>
                                        <option>Gifts</option>
                                        <option>Premium</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-pink outline-none"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-pink outline-none"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-dark text-white py-3 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-gray-800 transition-colors"
                            >
                                Add Product
                            </button>
                        </form>
                    </div>
                </div>

                {/* Product List */}
                <div className="lg:col-span-2">
                    <h2 className="font-serif text-xl font-bold text-brand-dark mb-6">Current Products ({products.length})</h2>
                    <div className="space-y-4">
                        {products.length === 0 ? (
                            <p className="text-gray-500 italic">No products yet.</p>
                        ) : (
                            products.map(product => (
                                <div key={product.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 group">
                                    <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                                        <p className="text-sm text-gray-500">₹{product.price} • {product.category}</p>
                                    </div>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                        title="Delete Product"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
