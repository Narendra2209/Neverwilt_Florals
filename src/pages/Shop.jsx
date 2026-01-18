import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function Shop() {
    const { products } = useShop();

    return (
        <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-brand-beige">
            <div className="text-center mb-16">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-4">Our Collection</h1>
                <p className="text-gray-500 max-w-xl mx-auto text-lg font-light">
                    Bring nature's beauty into your life with our carefully curated selection of blooms.
                </p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500 font-serif">No products found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
