import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X, Flower } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
    const { cart } = useShop();
    const [isOpen, setIsOpen] = useState(false);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        // { name: 'Admin', path: '/admin' }, // Hidden for aesthetics, accessible via url
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-brand-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Flower className="h-8 w-8 text-brand-pink" strokeWidth={1.5} />
                        <div className="flex flex-col">
                            <span className="font-serif text-2xl font-bold text-brand-dark tracking-wide">
                                Neverwilt Florals
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                                Flowers & Gifts
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors hover:text-brand-pink ${isActive ? 'text-brand-pink' : 'text-gray-600'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ShoppingBag className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-pink rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <Link to="/cart" className="relative p-2 mr-2">
                            <ShoppingBag className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-pink rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 -mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-brand-pink bg-brand-beige' : 'text-gray-600 hover:text-brand-pink hover:bg-gray-50'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <Link
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-50"
                        >
                            Admin Panel
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
