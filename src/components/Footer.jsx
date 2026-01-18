import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-brand-cream/30 border-t border-brand-cream pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-xl font-bold text-brand-dark">Neverwilt Florals</h3>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                            Handcrafted bouquets and floral arrangements for every occasion.
                            Making moments timeless with fresh blooms.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="font-serif font-semibold text-brand-dark">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-brand-pink transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-brand-pink transition-colors">Delivery Info</a></li>
                            <li><a href="#" className="hover:text-brand-pink transition-colors">Terms & Conditions</a></li>
                            <li><a href="/admin" className="hover:text-brand-pink transition-colors">Admin Login</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-serif font-semibold text-brand-dark">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-brand-pink transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-brand-pink transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-brand-pink transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="text-sm text-gray-600">
                            Email: hello@neverwilt.com <br />
                            Phone: +91 98765 43210
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 text-center">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Neverwilt Florals. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
