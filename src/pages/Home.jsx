import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Truck, Gift, Clock } from 'lucide-react';

export default function Home() {
    const { products } = useShop();
    // Get 4 random or first 4 products
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="space-y-20 pb-20">

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=2600&auto=format&fit=crop"
                        alt="Floral Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto space-y-6 animate-fade-in-up">
                    <span className="text-sm md:text-base font-medium tracking-[0.3em] uppercase opacity-90">
                        Welcome to Neverwilt Florals
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
                        Fresh Flowers for <br /> <span className="text-brand-cream/90 italic">Every Moment</span>
                    </h1>
                    <p className="text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
                        Handcrafted bouquets, gifts, and floral arrangements designed to make memories last.
                    </p>
                    <div className="pt-8">
                        <Link
                            to="/shop"
                            className="inline-flex items-center bg-brand-cream text-brand-dark px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-all transform hover:scale-105"
                        >
                            Shop Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark mb-4">Featured Collections</h2>
                    <div className="h-1 w-20 bg-brand-pink mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/shop" className="inline-block border-b border-brand-dark pb-1 text-brand-dark hover:text-brand-pink hover:border-brand-pink transition-colors uppercase tracking-widest text-sm font-bold">
                        View All Products
                    </Link>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-brand-cream/20 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl font-bold text-brand-dark">Why Choose Us?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto text-brand-pink">
                                <Truck className="h-8 w-8" />
                            </div>
                            <h3 className="font-serif text-xl font-semibold">Same-Day Delivery</h3>
                            <p className="text-gray-600">Order by 2 PM for fresh flower delivery right to your doorstep today.</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto text-brand-pink">
                                <Gift className="h-8 w-8" />
                            </div>
                            <h3 className="font-serif text-xl font-semibold">Custom Bouquets</h3>
                            <p className="text-gray-600">Tailor-made arrangements to express your feelings perfectly.</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto text-brand-pink">
                                <Clock className="h-8 w-8" />
                            </div>
                            <h3 className="font-serif text-xl font-semibold">Always Fresh</h3>
                            <p className="text-gray-600">Sourced daily from local growers to ensure maximum freshness.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
