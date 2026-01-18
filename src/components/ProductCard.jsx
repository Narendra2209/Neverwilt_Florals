import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const { addToCart } = useShop();

    return (
        <div className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 ease-out border border-gray-100">
            <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <div className="p-5 flex flex-col text-center">
                <Link to={`/product/${product.id}`} className="font-serif text-xl text-brand-dark hover:text-brand-pink transition-colors mb-2">
                    {product.name}
                </Link>

                <div className="text-gray-600 mb-4 font-medium">
                    ₹{product.price.toLocaleString()}
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className="w-full py-3 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
