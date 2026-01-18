import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Minus, Plus, Heart } from 'lucide-react';

export default function ProductDetails() {
    const { id } = useParams();
    const { products, addToCart } = useShop();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products.length > 0) {
            const found = products.find(p => p.id == id);
            setProduct(found);
            setLoading(false);
        }
    }, [id, products]);

    if (loading) return <div className="h-screen flex items-center justify-center font-serif text-xl">Loading floral details...</div>;
    if (!product) return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <p className="font-serif text-xl">Product not found.</p>
            <button onClick={() => navigate('/shop')} className="text-brand-pink underline">Back to Shop</button>
        </div>
    );

    const handleAddToCart = () => {
        addToCart(product, quantity);
        // Visual feedback?
        // Using simple alert for now is crude. 
        // Ideally use a toast context.
        // I'll skip alert to keep it "premium" and assume the navbar Cart count update is enough feedback + maybe a transient animation would be nice but beyond scope for this turn.
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
            <button onClick={() => navigate(-1)} className="mb-8 text-gray-500 hover:text-brand-dark transition-colors flex items-center text-sm font-medium tracking-wide">
                &larr; BACK TO SHOP
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
                {/* Product Image */}
                <div className="relative aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden shadow-sm group">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col space-y-8 pt-4">
                    <div>
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mt-3 mb-4">{product.name}</h1>
                        <p className="text-3xl font-medium text-gray-900 font-serif">₹{product.price.toLocaleString()}</p>
                    </div>

                    <div className="prose prose-stone text-gray-600 leading-relaxed font-light">
                        <p>{product.description}</p>
                        <p>Each bouquet is handcrafted with love and care, ensuring the freshest blooms for your special moments.</p>
                    </div>

                    <div className="h-px w-full bg-gray-200" />

                    <div className="space-y-6">
                        <div className="flex items-center justify-between max-w-xs">
                            <span className="uppercase text-xs font-bold text-gray-500 tracking-wider">Quantity</span>
                            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 space-x-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="text-gray-400 hover:text-brand-dark transition-colors"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="font-medium w-6 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="text-gray-400 hover:text-brand-dark transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-brand-dark text-white py-4 rounded-full uppercase tracking-[0.15em] font-bold text-sm hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Add to Cart
                            </button>
                            <button className="p-4 rounded-full border border-gray-300 hover:border-brand-pink hover:text-brand-pink transition-colors">
                                <Heart className="h-6 w-6" strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-brand-cream/20 p-6 rounded-lg space-y-3">
                        <h4 className="font-serif font-bold text-brand-dark">Included with your order:</h4>
                        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                            <li>Complimentary message card</li>
                            <li>Flower care instructions</li>
                            <li>Signature packaging</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
